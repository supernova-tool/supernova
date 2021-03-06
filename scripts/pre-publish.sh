#!/usr/bin/env bash

npm version patch -m "Bumping to %s"
git push origin master
git push --tags
