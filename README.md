# Zway-RaspberryCam

Zway camera device for the Raspberry camera module.

# Configuration

## flip

Sets image flip

# Virtual Devices

This module creates a virtual camera device.

# Events

No events are emitted

# Installation

The prefered way of installing this module is via the "Zwave.me App Store"
available in 2.2.0 and higher. For stable module releases no access token is
required. If you want to test the latest pre-releases use 'k1_beta' as
app store access token.

For developers and users of older Zway versions installation via git is
recommended.

```shell
cd /opt/z-way-server/automation/userModules/RaspberryCam
git fetch --tags
# For latest released version
git checkout tags/latest
# For a specific version
git checkout tags/1.02
# For development version
git checkout -b master --track origin/master
```

No matter if you install this module directly via git, or via App Store,
you'll need to perform these additional steps to have a working camera
device.

```shell
# Create image directory
mkdir /opt/z-way-server/automation/tmp/
# Allow module to call raspistill command
echo '/usr/bin/raspistill' >> /opt/z-way-server/automation/.syscommands
```

Furthermore it is recommended to mount the tmp directory using tmpfs to extend
the live of the SD card. Add the following line to /etc/fstab

```
 tmpfs /opt/z-way-server/automation/tmp tmpfs nodev,nosuid,size=5M 0 0
```

# License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any
later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
