/*** RaspberryCam Z-Way HA module *******************************************

Version: 1.0.0
(c) Maroš Kollár, 2015
-----------------------------------------------------------------------------
Author: maros@k-1.com <maros@k-1.com>
Description:
    Displays stills from the local Raspberry PI camera module.

******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------
RaspberryCam
function RaspberryCam (id, controller) {
    // Call superconstructor first (AutomationModule)
    RaspberryCam.super_.call(this, id, controller);
}

inherits(RaspberryCam, AutomationModule);

_module = RaspberryCam;

// ----------------------------------------------------------------------------
// --- Module RaspberryCam initialized
// ----------------------------------------------------------------------------

_.extend(RaspberryCam.prototype, {
    init: function (config) {
        RaspberryCam.super_.prototype.init.call(this, config);
        var self=this;
        var that = this,
            vDevId = "CameraDevice_" + this.id;
        
        console.log(this.url);      
        
        var opener = function(command) {
            config.doorDevices.forEach(function(el) {
                var vDev = that.controller.devices.get(el);
                
                if (vDev) {
                    var type = vDev.get("deviceType");
                    if (type === "switchBinary") {
                        vDev.performCommand(command == "open" ? "on" : "off");
                    } else if (type === "doorlock") {
                        vDev.performCommand(command);
                    }
                }
            });
        };
        
        // Setup global http callback
        RaspberryCam = function() {
            // Aspect ration 1 1/3
            system('/usr/bin/raspistill --width 500 --height 375 --quality 90 --encoding jpg --output /opt/z-way-server/automation/tmp/current.jpg')
            // TODO stat last image
            // TODO --exposure night for late hours
            // TODO --hflip --vflip
            // TODO link /var/tmp/raspicam.jpeg to modules/RaspberryCam/current.jpg
            // var image = fs.load('modules/RaspberryCam/current.jpg');
            var image = fs.load('tmp/current.jpg');
            if (typeof image !== 'string') {
                return {
                    status: 404,
                    headers: {
                        contentType: 'image/jpeg'
                    },
                    body: 'xxx'
                }
            }
            return {
                status: 200,
                headers: {
                    contentType: 'image/jpeg'
                },
                body: image
            }
        };
        ws.allowExternalAccess('RaspberryCam');
        
        this.vDev = this.controller.devices.create({
            deviceId: vDevId,
            defaults: {
                deviceType: "camera",
                metrics: {
                    icon: 'camera',
                    title: 'RaspberryCam ' + this.id
                }
            },
            overlay: {
                metrics: {
                    url: "/RaspberryCam",
                }
            },
            moduleId: this.id
        });
    },
    stop: function () {
        RaspberryCam.super_.prototype.stop.call(this);
        
        if (this.vDev) {
            this.controller.devices.remove(this.vDev.id);
            this.vDev = null;
        }
    }
});