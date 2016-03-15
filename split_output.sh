#!/bin/bash

if [ "$TRAVIS_REPO_SLUG" == "sphereio/commercetools-sunrise-theme" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ] ; then

    export SPLIT_REPO=https://${GH_TOKEN}@github.com/jayS-de/sunrise-theme
    export LAST_LOG_ENTRY=`git log --pretty=format:%B -1`

    git config --global user.email "automation@commercetools.de"
    git config --global user.name "Travis CI"
    git config --global github.token "${GH_TOKEN}"

    grunt release-composer

    cp -R composer ${HOME}/theme-output

    cd ${HOME}
    git clone --quiet ${SPLIT_REPO} sunrise-theme > /dev/null 2>&1

    cd ${HOME}/sunrise-theme
    cp -Rf ${HOME}/theme-output/* .
    git add -A .

    git status
    git commit -m "${LAST_LOG_ENTRY}"
    git push origin/master > /dev/null 2>&1
fi
