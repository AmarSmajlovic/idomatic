# Known issues

## Resolved

- ~~Generate unique id instead of incrementing~~ — resolved in parser-js@1.1.0 /
  parser-html@1.1.0. IDs are now semantic (derived from tag, descriptive
  attributes and text content) and made unique by seeding the generator with
  ids already present in the file and suffixing `-2`, `-3`, ... only on
  collision. Re-running the scan is now idempotent.
