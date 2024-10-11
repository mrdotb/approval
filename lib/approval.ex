defmodule Approval do
  @moduledoc """
  ## Lightweight approval testing for Elixir

  This package provides some utilities to help automatically generate
  reference images for test cases, review those reference images
  and compare snapshots to the reference images to look for regressions.
  """

  require EEx

  @external_resource "priv/assets/resemble.js"
  @external_resource "priv/assets/diff.css"

  @diff_js File.read!("priv/assets/resemble.js")
  @diff_css File.read!("priv/assets/diff.css")

  EEx.function_from_file(:defp, :diff_html, "priv/assets/diff.html", [:assigns])

  @doc false
  def generate_diff_html(reference_path, snapshot_path, reference_data, snapshot_data) do
    diff_path = reference_path <> ".diff.html"

    html_file_content = diff_html(
      snapshot_path: snapshot_path,
      reference_path: reference_path,
      snapshot_data: Base.encode64(snapshot_data),
      reference_data: Base.encode64(reference_data),
      diff_js: @diff_js,
      diff_css: @diff_css
    )

    File.write!(diff_path, html_file_content)
  end

  defp approve_images(reference_path, snapshot_path, approved) do
    quote do
      require Logger
      reference_path = unquote(reference_path)
      snapshot_path = unquote(snapshot_path)
      approved = unquote(approved)
      diff_path = reference_path <> ".diff.html"

      cond do
        # No reference file exist. In this situation, simply fail the test.
        # The user has to privide a reference file.
        not File.exists?(snapshot_path) ->
          raise Approval.ApprovalError, "snapshot file \"#{Path.relative_to_cwd(snapshot_path)}\" " <>
            "does not exist."

        # This is the first time this test has been run.
        # In this case, don't fail the test, but emit a warning
        # so that the user remembers to approve the reference.
        not File.exists?(reference_path) ->
          # If the reference file exists (maybe it was taken from somewhere else),
          # don't overwrite it! Only write a new reference file if it doesn't exist.
          if not File.exists?(reference_path) do
            # Write a NEW reference file
            File.cp!(snapshot_path, reference_path)
          end

          Logger.warning("\nThe following reference file must be approved: " <>
            "\"#{Path.relative_to_cwd(reference_path)}\"")

        # Both the reference file and the snapshot file exist,
        # and the reference hasn't been approved yet
        approved == false ->
          raise Approval.ApprovalError, "The following reference has not been reviewed: " <>
            "\"#{Path.relative_to_cwd(reference_path)}\""

        # Both the reference file and the snapshot file exist,
        # and the reference has already been approved
        approved == true ->
          # Finally, we can run a simple honest assert
          reference_content = File.read!(reference_path)
          snapshot_content = File.read!(snapshot_path)

          if reference_content != snapshot_content do
            Approval.generate_diff_html(
              reference_path,
              snapshot_path,
              reference_content,
              snapshot_content
            )

            raise Approval.ApprovalError, """
              The following reference and snapshot don't match:

                    - #{Path.relative_to_cwd(reference_path)}
                    - #{Path.relative_to_cwd(snapshot_path)}

                  To see the differences, open the file "#{Path.relative_to_cwd(diff_path)}".
              """
          end
      end
    end
  end

  @doc """
  Sets up an approval test.

  Takes the following arguments:

    - `:snapshot` - the data generated by your code.
      If the data represents an image, it should be given as
      `File.read!(some_path)`.

    - `:reference` - the reference data with which the snapshots
      will be compared. Again, if it represents an image, it should
      be given as `File.read!(some_path)`. This file doesn't need
      to exist. In fact, the whole point is that the `approval` macro
      will generate it the first time the test is run and you'll only
      have to review it later. If you already have a reference file,
      it won't be overwritten.

    - `:reviewed` (*optional*, default: `false`) - whether the reference
      data has been reviewed by the user or not

  First, the test wouldn't be manually reviewed:

      import Approve

      test "example test" do
        snapshot = File.write!("snapshot.png", create_new_image_data(...))

        approve snapshot: File.read!("snapshot.png"),
                reference: File.read!("reference.png"), # this file doesn't exist, it will be created
                reviewed: false # the user hasn't manually reviewed the reference yet
      end

  When you run the test above, the code will copy the snapshot into the reference.
  This creates the new `"reference.png"` file, which you must review manually.
  Further snapshots will be compared to this reference.
  Until you review the reference file, the test will fail.
  After reviewing the reference file, you should update the code above by replacing
  `reviewed: false` by `reviewed: true`, so that it reads:

      import Approve

      test "example test" do
        snapshot = File.write!("snapshot.png", create_new_image_data(...))

        approve snapshot: File.read!("snapshot.png"),
                reference: File.read!("reference.png"), # this file exists and has been reviewed
                reviewed: true # the user has reviewed the reference
      end

  If at any point the snapshot file becomes different from the reference,
  the test will fail and the `approve` macro will generate an HTML file
  next to the snapshot named "snapshot.png.diff.html" (in general it will be
  `reference_path <> "diff.html"`). That HTML file contains the old and new
  versions of the images side by side. In the middle it shows the difference
  between the two images.

  If at any point you want to change the reference file (let's say you have
  found a bug in the code that generated the previous reference), you can
  simply add a new reference file manually.

  This is an example `diff.html` file made from two images:

  ![diff.html](assets/diff_html.png)

  ### Implementation notes

  The most portable way of comparing two images is by running javascript
  inside a web browser, which is what we do here.
  One possible criticism is that the user needs to manually open the HTML
  files in a web browser to view the results, instead of having the test suite
  spin up a web app which would centralize all images and even allow one to
  approve changes from the web browser itself.

  However, that implementation is not very portable and is quite complex.
  This implementation is optimized for simplicity, and it has settled on using
  the filesystem as the only source of persistence.
  The downside is the whole manual fiddling with files, but that is not too bad
  in practice

  In the future, I plan to support other kinds of data besides images,
  and that is the goal of the somewhat verbose `snapshot: File.read!(path)`
  syntax, instead of the shorter `snapshot: path` alternative.
  """
  defmacro approve(opts) do
    snapshot = case Keyword.fetch(opts, :snapshot) do
      {:ok, {{:., _m1, [{:__aliases__, _m2, [:File]}, :read!]}, _m3, [path]}} ->
        {:path, path}

      :error ->
        raise ArgumentError, "accept macro requires a :snapshot"
    end

    reference = case Keyword.fetch(opts, :reference) do
      {:ok, {{:., _m1, [{:__aliases__, _m2, [:File]}, :read!]}, _m3, [path]}} ->
        {:path, path}

      :error ->
        raise ArgumentError, "accept macro requires a :reference"
    end

    reviewed = Keyword.get(opts, :reviewed, false)

    case {reference, snapshot} do
      {{:path, reference_path}, {:path, snapshot_path}} ->
        approve_images(reference_path, snapshot_path, reviewed)
    end
  end
end
