#!/usr/bin/env bash

npm version patch -m "Bumping to %s"
git push origin main
git push --tags
