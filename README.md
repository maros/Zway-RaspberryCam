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

```shell
# Create image directory
mkdir /opt/z-way-server/automation/tmp/
# Allow module to call raspistill command
echo '/usr/bin/raspistill' >> /opt/z-way-server/automation/.syscommands
cd /opt/z-way-server/automation/modules
git clone https://github.com/maros/Zway-RaspberryCam.git RaspberryCam --branch latest
```

Furthermore it is recommended to mount the tmp directory using tmpfs to extend
the live of the SD card. Add the following line to /etc/fstab

``
 tmpfs /opt/z-way-server/automation/tmp tmpfs nodev,nosuid,size=10M 0 0
```

To update or install a specific version
```shell
cd /opt/z-way-server/automation/modules/RaspberryCam
git fetch --tags
# For latest released version
git checkout tags/latest
# For a specific version
git checkout tags/1.02
# For development version
git checkout -b master --track origin/master
```

Alternatively this module can be installed via the Z-Wave.me app store. Just
go to Management > App Store Access and add 'k1_beta' access token. However
you will still need to create the required directories and set the allowed 
syscommands manually.

# License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any 
later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
