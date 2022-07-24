# Hygen-global

Install Hygen globally using your Node.js package manager of choice.
```bash
# for npm
npm i -g hygen
```

Create and initialize global template directory
```bash
cd
mkdir .hygen
cd .hygen
mkdir templates
```

Configure Hygen to use a global templates directory by add this line to `.bashrc` or your system's equivalent.
```bash
export HYGEN_TMPLS=$(pwd)/.hygen/templates
```

Move your templates inside `/home/<you_username>/.hygen/templates`.