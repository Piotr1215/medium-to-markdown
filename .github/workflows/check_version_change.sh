#!/bin/bash

# Function to compare versions
version_gt() {
	test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1"
}

# Get the previous and current versions from git history
PREVIOUS_VERSION=$(git show HEAD~1:package.json | jq -r .version)
CURRENT_VERSION=$(jq -r .version package.json)

# Check if the version has changed
if [ "$PREVIOUS_VERSION" == "$CURRENT_VERSION" ]; then
	echo "Version has not changed. Exiting..."
	exit 1
fi

# Check if the current version follows semantic versioning
if ! echo "$CURRENT_VERSION" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+$'; then
	echo "Current version $CURRENT_VERSION does not follow semantic versioning. Exiting..."
	exit 1
fi

# Check if the current version is greater than the previous version
if ! version_gt "$CURRENT_VERSION" "$PREVIOUS_VERSION"; then
	echo "Current version $CURRENT_VERSION is not greater than previous version $PREVIOUS_VERSION. Exiting..."
	exit 1
fi

echo "Version has changed from $PREVIOUS_VERSION to $CURRENT_VERSION."
exit 0
