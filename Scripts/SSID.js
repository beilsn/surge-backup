const SSID = $network.wifi.ssid;
const proxywifi = !$persistentStore.read("lkWifiSsids")?["K3-5G"]:JSON.parse($persistentStore.read("lkWifiSsids"));
let res = proxywifi.some(val => val === SSID);
let lkWifiLast = !$persistentStore.read("lkWifiLast")?"abcdefghijklmnopqrstuvwxyz":$persistentStore.read("lkWifiLast");
if (lkWifiLast!=SSID){
    !$persistentStore.write(SSID, "lkWifiLast")
    if (res) {
        $surge.setOutboundMode("direct");
        notify(1);
    } else {
        $surge.setOutboundMode("rule");
        notify(0);
    }
}

function notify(mode) {
    setTimeout(function () {
        !!mode ? $notification.post("Wi-Fi assistant", "switch to direct mode", `your SSID is ${SSID}`) : $notification.post("Wi-Fi assistant", "switch to proxy mode", `${!!SSID ? "your SSID is " + SSID : "you are using cellular"}`)
    })
}

$done();
