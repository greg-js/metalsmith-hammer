# metalsmith-hammer

Metalsmith is [an extremely simple, *pluggable* static site generator](https://github.com/metalsmith/metalsmith). It allows you to chain plugins together to create complex static site builders.

But every smith needs a hammer. If your workflow revolves around using the command-line, it can get bothersome to keep opening markdown and other documents somewhere within your project tree. That's what this package is for. When in doubt, use a hammer.

This project is in early stages of development. For now, only the core feature of editing `metalsmith` files with your favorite editor has been implemented. Over time I will add more features and further polish the metalsmithing command-line experience.

Feel free to request features or submit pull requests! Honestly, I've only just begun using metalsmith and felt the need to write this to make my own experience smoother. Chances are you know more than I do what could be useful addition. By the way, I based this on [my other, similar plugin for `hexo`](https://github.com/greg-js/hexo-cli-extras) so take a look there if you're also a `hexo` user.

## Installation

```
npm install -g metalsmith-hammer
```

This is a global package and you only need to install it once. It's not quite a metalsmith plugin so don't install it locally or include it in your static site's `package.json` or `metalsmith.json`.

Read [this](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) or install [nvm](https://github.com/creationix/nvm) if you find you need `sudo`.

## tl;dr

Running `hammer edit` anywhere within a directory associated with a `metalsmith` static site generator will give you a list of all markdown files in the `./src` directory. Select one and it will open in your $EDITOR. If you don't have this environment variable or if you run `hammer` with `-g`/`--gui`, the file will open in the associated GUI program instead (ie, Atom or Sublime or whatever).

Renamed your `src` directory? Drop a `.hammer.json` file in your project root dir and put this in it:

```
{
  "source": "your_source_directory",
}
```

Not writing in markdown? Add `"defaultType": "your_favorite_file_extension"` to `.hammer.json` or use the `type` option on the command-line.

Filter your hammer queries with regular expressions like this: `hammer edit search term`. Now only articles will pop up in the menu that contain `/search/` and `/term/`. Only care about files in your `posts` collection? Just add `-f posts` or `--folder posts` to your query.

## `hammer edit`

The core and for now only feature of `hammer` is `edit`. This is what happens when you run `hammer edit` somewhere in your file system:

- `hammer` identifies the root directory of the project and checks whether it includes metalsmith
- If it exists, a project-specific `.hammer.json` overwrites the default configuration settings (see below)
- All files that match both your query and the configuration settings are displayed in a menu and you choose the one you want to edit
- The selected file opens in your `$EDITOR` or associated GUI program

### Default settings and `.hammer.json`

These are the default settings:

```
{
  "source": "src",
  "sourceDirs": [],
  "defaultType": "md"
}
```

Overwrite individual (or all) options on a project-per-project basis by including a `.hammer.json` file.

- `source`: The main directory you want to edit files in
- `sourceDirs`: An array of extra (top-level) directories you want to edit files in. For example, you may want to add `layouts` or `partials` here if you want to use `hammer` to edit the files in those directories.
- `defaultType`: The default filetype to look for

### `edit` options

As noted earlier, `hammer edit` will present you with a list of *all* files located somewhere within the `source` or `sourceDirs` dirs that match the `defaultType`.

Fine-tune your query by using any or all of the following:

- regular expressions: every word that isn't an option will be treated as a regular expression to filter the files on. Right now, just the filenames are taken into consideration
- `-f`/`--folder`: you probably have subfolders in your source director{y,ies}. Select only a specific subfolder by using this option
- `-t`/`--type`: specify a file extension. In effect this overwrites your `defaultType` for a single query

Examples:

```
hammer edit
hammer edit cool post
hammer edit -f articles
hammer edit -t html
hammer edit app -f scripts -t js
```

## Todo

* implement more commands - `rename`, `delete`, `new`
* allow searching and filtering on metadata & file content
