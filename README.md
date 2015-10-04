# Zway-RaspberryCam

Zway camera module for the Raspberry camera module.

# Configuration

In order to get images from the camera you need to run the following commands
on the raspberry shell:

 mkdir /opt/z-way-server/automation/tmp/
 echo '/usr/bin/raspistill' >> /opt/z-way-server/automation/.syscommands

Furthermore it is recommended to mount the tmp directory using tmpfs to extend
the live of the SD card. Add the following line to /etc/fstab

 tmpfs /opt/z-way-server/automation/tmp tmpfs nodev,nosuid,size=10M 0 0

## flip

Sets image flip

# Virtual Devices

This module creates a virtual camera device.

# Events

No events are emitted

# License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any 
later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
