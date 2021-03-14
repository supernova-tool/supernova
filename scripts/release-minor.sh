#!/usr/bin/env bash

npm version minor -m "Bumping to %s"
git push origin main
git push --tags
