#!/usr/bin/env bash

npm version major -m "Bumping to %s"
git push origin main
git push --tags
