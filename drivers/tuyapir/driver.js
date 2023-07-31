'use strict';

const TuyaBaseDriver = require('../tuyabasedriver');

class TuyaPirDriver extends TuyaBaseDriver {

    onInit() {
        this.log('Tuya pir driver has been initialized');
    }

    async onPairListDevices() {
        let devices = [];
        if (!this.homey.app.isConnected()) {
            throw new Error("Please configure the app first.");
        }
        else {
            let covers = this.get_devices_by_type("pir");
            for (let tuyaDevice of Object.values(covers)) {
                let capabilities = [];
                // if tuyaDevice has capabilitiy illuminance
                // you need to Change Control Instruction Mode to "DP Instructions"
                // follow: https://developer.tuya.com/en/docs/iot/change-control-instruction-mode?id=Kcbz8lahbg5st
                // capabilities.push("illuminance")
                capabilities.push("alarm_motion");
                capabilities.push("measure_battery");
                capabilities.push("alarm_battery");
                devices.push({
                    data: {
                        id: tuyaDevice.id
                    },
                    capabilities: capabilities,
                    name: tuyaDevice.name
                });

            }
        }
        return devices.sort(TuyaBaseDriver._compareHomeyDevice);
    }
}

module.exports = TuyaPirDriver;
