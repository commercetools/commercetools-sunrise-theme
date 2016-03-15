#!/bin/bash

if [ "$TRAVIS_REPO_SLUG" == "sphereio/commercetools-sunrise-theme" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ] ; then

    export SPLIT_REPO=https://${GH_TOKEN}@github.com/jayS-de/sunrise-theme
    export LAST_LOG_ENTRY=`git log --pretty=format:%B -1`
    git config --global user.email "automation@commercetools.de"
    git config --global user.name "Travis CI"
    git config --global github.token "${GH_TOKEN}"

    echo -e "Adding subtree for release...\n"
    git subtree add -q --prefix composer ${SPLIT_REPO} master --squash > /dev/null

    grunt release-composer

    echo -e "Adding output to subtree...\n"

    git add -A
    git commit -m "${LAST_LOG_ENTRY}"

    echo -e "Pushing output to subtree...\n"
    git subtree push -q --prefix composer ${SPLIT_REPO} master --squash > /dev/null
    git reset --hard origin/master

    echo -e "Subtree split done.\n"
fi
