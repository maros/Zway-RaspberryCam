/*** RaspberryCam Z-Way HA module *******************************************

Version: 1.00
(c) Maroš Kollár, 2015
-----------------------------------------------------------------------------
Author: Maroš Kollár <maros@k-1.com>
Description:
    Displays stills from the local Raspberry PI camera module.

******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function RaspberryCam (id, controller) {
    // Call superconstructor first (AutomationModule)
    RaspberryCam.super_.call(this, id, controller);
}

inherits(RaspberryCam, AutomationModule);

_module = RaspberryCam;

// ----------------------------------------------------------------------------
// --- Module RaspberryCam initialized
// ----------------------------------------------------------------------------

RaspberryCam.prototype.init = function (config) {
    RaspberryCam.super_.prototype.init.call(this, config);
    var self    = this;
    var vDevId  = "CameraDevice_" + this.id;
    
    // Setup global http callback
    RaspberryCamHandler = function() {
        // TODO create tmp/
        // Aspect ration 1 1/3
        var options = {
            width:      500,
            height:     375,
            quality:    90,
            //encoding:   'jpeg',
            output:     '/opt/z-way-server/automation/tmp/current.jpg'
        };
        if (config.flip === true) {
            options.hflip = true;
            options.vflip = true;
        }
        // TODO --exposure night for late hours
        var command = '/usr/bin/raspistill';
        command = command + ' ' + _.map(options, function(value,key) {
            return '--' + key + (typeof(value) === 'boolean' ? '':' '+value);
        }).join(' ');
        system(command);
        var image = fs.load('tmp/current.jpg');
        if (typeof image !== 'string') {
            image = fs.load('modules/RaspberryCam/noimage.jpg');
            return {
                status: 404,
                headers: {
                   'Content-Type': 'image/png'
                },
                body: image
            };
        }
        return {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
                'cache-control': 'public, max-age=0, no-cache'
            },
            body: image
        };
    };
    
    ws.allowExternalAccess('RaspberryCamHandler',self.controller.auth.ROLE.USER);
    
    self.vDev = this.controller.devices.create({
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
};

RaspberryCam.prototype.stop = function () {
    RaspberryCam.super_.prototype.stop.call(this);
    
    var self = this;
    
    if (self.vDev) {
        self.controller.devices.remove(self.vDev.id);
        self.vDev = undefined;
    }
};