// 合并事件
Array.prototype.push.apply(tileboard.events, [

]);

var CONFIG = {
    customTheme: CUSTOM_THEMES[tileboard.search('theme')],
    transition: TRANSITIONS.ANIMATED_GPU,
    entitySize: ENTITY_SIZES.NORMAL,
    tileSize: 130,
    tileMargin: 6,
    serverUrl: location.protocol + '//' + location.host,
    wsUrl: (location.protocol === 'http:' ? 'ws' : 'wss') + '://' + location.host + '/api/websocket',
    authToken: null,
    //googleApiKey: "XXXXXXXXXX", // Required if you are using Google Maps for device tracker
    //mapboxToken: "XXXXXXXXXX", // Required if you are using Mapbox for device tracker
    debug: false, // Prints entities and state change info to the console.
    pingConnection: true, //ping connection to prevent silent disconnections
    locale: 'zh-cn', // locale for date and number formats - available locales: it, de, es, fr, pt, ru, nl, pl, en-gb, en-us (default). See readme on adding custom locales.
    // next fields are optional
    events: tileboard.events,
    timeFormat: 24,
    menuPosition: MENU_POSITIONS.LEFT, // or BOTTOM
    hideScrollbar: false, // horizontal scrollbar
    groupsAlign: GROUP_ALIGNS.HORIZONTALLY, // HORIZONTALLY, VERTICALLY, GRID
    onReady: function () {
        tileboard.onReady(this)
        tileboard.loadScript('voice.js')
    },

    header: { // https://github.com/resoai/TileBoard/wiki/Header-configuration
        styles: {
            margin: '20px 65px 0 65px',
            fontSize: '28px'
        },
        right: [
            {
                type: HEADER_ITEMS.WEATHER,
                styles: {
                    margin: '30px 0 0 0'
                },
                icon: '&weather.wo_de_jia.state',
                icons: weatherIcon,
                states: weatherName,
                fields: {
                    temperature: '&weather.wo_de_jia.attributes.temperature',
                    temperatureUnit: '°C',
                }
            }
        ],
        left: [
            {
                type: HEADER_ITEMS.DATETIME,
                dateFormat: 'EEEE, dd LLLL', //https://docs.angularjs.org/api/ng/filter/date
            }
        ]
    },

    screensaver: {// optional. https://github.com/resoai/TileBoard/wiki/Screensaver-configuration
        timeout: 300, // after 5 mins of inactive
        slidesTimeout: 10, // 10s for one slide
        styles: { fontSize: '40px' },
        leftBottom: [{ type: SCREENSAVER_ITEMS.DATETIME }], // put datetime to the left-bottom of screensaver
        slides: [
            { bg: 'https://pic.downk.cc/item/5ec331eec2a9a83be54d84f4.jpg' },
            { bg: 'https://pic.netbian.com/uploads/allimg/170609/123945-1496983185ad61.jpg' },
            { bg: 'https://pic.netbian.com/uploads/allimg/211109/115513-163643011323a5.jpg' },
            {
                bg: 'https://pic.netbian.com/uploads/allimg/170725/103840-150095032034c0.jpg',
                rightTop: [ // put text to the 2nd slide
                    {
                        type: SCREENSAVER_ITEMS.CUSTOM_HTML,
                        html: '欢迎来到 <b>我的智慧家庭</b>',
                        styles: { fontSize: '40px' }
                    }
                ]
            }
        ]
    },

    pages: [
        {
            title: '主页',
            bg: './images/bg1.jpeg',
            icon: 'mdi-home-outline', // home icon
            groups: [
                {
                    title: '生活信息 - 媒体中心',
                    width: 3,
                    height: 3,
                    // row: 0,  // optional; index of the row used for the GRID layout. If not specified, the default is 0
                    items: [
                        {
                            // please read README.md for more information
                            // this is just an example
                            position: [0, 0],
                            height: 2, // 1 for compact
                            //classes: ['-compact'],
                            type: TYPES.WEATHER,
                            id: 'weather.wo_de_jia',
                            // state: function () {return 'Clear, night'},
                            icon: '&weather.wo_de_jia.state',
                            title: '上海',
                            icons: weatherIcon,
                            states: weatherName,
                            fields: {
                                temperature: '&weather.wo_de_jia.attributes.temperature',
                                temperatureUnit: '°C',
                                humidity: '&weather.wo_de_jia.attributes.humidity',
                                humidityUnit: '%',
                            }
                        },
                        {
                            position: [1, 0],
                            width: 2,
                            type: TYPES.TEXT_LIST,
                            id: {}, // using empty object for an unknown id
                            state: false, // disable state element
                            list: [
                                {
                                    title: '客厅温度',
                                    icon: 'mdi-clock-outline',
                                    value: '&sensor.lywsdcgq_temperature.state',
                                    unit: ' °C',
                                },
                                {
                                    title: '主卧温度',
                                    icon: 'mdi-clock-outline',
                                    value: '&sensor.lywsdcgq_temperature.state',
                                    unit: ' °C',
                                },
                                {
                                    title: '次卧温度',
                                    icon: 'mdi-clock-outline',
                                    value: '&sensor.lywsdcgq_temperature.state',
                                    unit: ' °C',
                                },
                                {
                                    title: '客厅湿度',
                                    icon: 'mdi-clock-outline',
                                    value: '&sensor.lywsdcgq_humidity.state',
                                    unit: ' %',
                                },
                                {
                                    title: '主卧湿度',
                                    icon: 'mdi-clock-outline',
                                    value: '&sensor.lywsdcgq_temperature.state',
                                    unit: ' %',
                                },
                            ]
                        },
                        {
                            position: [1, 1],
                            width: 2,
                            type: TYPES.TEXT_LIST,
                            id: {}, // using empty object for an unknown id
                            state: false, // disable state element
                            list: [
                                {
                                    title: '门口',
                                    icon: 'mdi-walk',
                                    value: 'off'
                                },
                                {
                                    title: '玄关',
                                    icon: 'mdi-walk',
                                    value: 'off'
                                },
                                {
                                    title: '阳台',
                                    icon: 'mdi-walk',
                                    value: 'off'
                                },
                                {
                                    title: '卫生间',
                                    icon: 'mdi-walk',
                                    value: '&binary_sensor.lumi_lumi_sensor_motion_3876d103_ias_zone.state'
                                },
                                {
                                    title: '床底',
                                    icon: 'mdi-walk',
                                    value: '&binary_sensor.lumi_lumi_sensor_motion_0cf93005_ias_zone.state'
                                },
                            ],
                            filter: function (value) {
                                // console.log(value)
                                switch (value) {
                                    case 'on': return '有人';
                                    case 'off': return '没人';
                                    default: return value;
                                }
                            }
                        },
                        {
                            position: [0, 2],
                            width: 2,
                            id: 'media_player.yun_yin_le',
                            type: TYPES.MEDIA_PLAYER,
                            hideSource: false,
                            hideMuteButton: true,
                            state: false,
                            //state: '@attributes.media_title',
                            title: '@attributes.media_title',
                            // bgSuffix: '@attributes.entity_picture',
                        },
                        {
                            position: [0, 3],
                            type: TYPES.CUSTOM,
                            title: '语音识别',
                            state: false,
                            id: {},
                            icon: 'mdi-microphone',
                            action: function (item, entity) {
                                if (window.VOICE_RECOGNITION) {
                                    window.VOICE_RECOGNITION.initVoiceRecorder(true)
                                } else {
                                    window.Noty.addObject({ title: '语音小助手', message: '请在HTTPS下使用', lifetime: 3, type: 'info' })
                                }
                            }
                        },
                    ]
                },

                {
                    title: '场景模式',
                    width: 2,
                    height: 3,
                    items: [
                        {
                            position: [0, 0],
                            id: {},
                            type: TYPES.SCRIPT,
                            state: false,
                            icon: 'mdi-movie-roll',
                            title: '观影模式',
                        },
                        {
                            position: [1, 0],
                            id: {},
                            type: TYPES.SCRIPT,
                            state: false,
                            icon: 'mdi-home-import-outline',
                            title: '回家模式',
                        },
                        {
                            position: [0, 1],
                            id: {},
                            type: TYPES.SCRIPT,
                            state: false,
                            icon: 'mdi-account-music',
                            title: '音乐模式',
                        },
                        {
                            position: [1, 1],
                            id: {},
                            type: TYPES.SCRIPT,
                            state: false,
                            icon: 'mdi-account-clock',
                            title: '休闲模式',
                        },
                        {
                            position: [0, 2],
                            id: {},
                            type: TYPES.SCRIPT,
                            state: false,
                            icon: 'mdi-account-group',
                            title: '会客模式',
                        },
                        {
                            position: [1, 2],
                            id: {},
                            type: TYPES.SCRIPT,
                            state: false,
                            icon: 'mdi-account-lock',
                            title: '私密模式',
                        }
                    ]
                },

                {
                    title: '离家',
                    width: 1,
                    height: 3,
                    items: [
                        {
                            position: [0, 0],
                            id: {},
                            type: TYPES.SCRIPT,
                            state: false,
                            icon: 'mdi-home-export-outline',
                            title: '离家模式',
                        },
                        {
                            position: [0, 1],
                            id: {},
                            type: TYPES.SCRIPT,
                            state: false,
                            icon: 'mdi-home-search',
                            title: '检测设备状态',
                        },
                        {
                            position: [0, 2],
                            id: {},
                            type: TYPES.SCRIPT,
                            state: false,
                            icon: 'mdi-close-network',
                            title: '关闭所有设备',
                        }

                    ]
                }
            ]
        },

        {
            title: '全屋设备',
            bg: './images/bg3.jpg',
            icon: 'mdi-collage',
            groups: [


                {
                    title: '客厅 - 阳台',
                    width: 3,
                    height: 3,
                    // row: 0,  // optional; index of the row used for the GRID layout. If not specified, the default is 0
                    items: [
                        {
                            position: [0, 0],
                            type: TYPES.LIGHT,
                            id: 'input_boolean.ce_shi',
                            title: '吸顶灯',
                            states: {
                                on: "开",
                                off: "关"
                            },
                            icons: {
                                on: "mdi-lightbulb-on",
                                off: "mdi-lightbulb",
                            }
                        },
                    ]
                },


                {
                    title: '餐厅 - 厨房',
                    width: 2,
                    height: 3,
                    // row: 0,  // optional; index of the row used for the GRID layout. If not specified, the default is 0
                    items: [
                        {
                            position: [0, 0],
                            type: TYPES.SWITCH,
                            id: 'input_boolean.ce_shi',
                            title: '厨房灯',
                            states: {
                                on: "开",
                                off: "关"
                            },
                            icons: {
                                on: "mdi-lightbulb-on",
                                off: "mdi-lightbulb",
                            }
                        },
                    ],
                },
                {
                    title: '主卧',
                    width: 2,
                    height: 3,
                    items: [

                    ]
                },


                {
                    title: '次卧',
                    width: 2,
                    height: 3,
                    items: [

                    ]
                },



                {
                    title: '书房',
                    width: 2,
                    height: 3,
                    items: [

                    ]
                },


                {
                    title: '玄关',
                    width: 1,
                    height: 3,
                    items: [

                        {
                            position: [0, 1],
                            type: TYPES.LOCK,
                            id: { state: 'locked' },
                            title: '大门',
                            states: {
                                locked: "Locked",
                                unlocked: "Unlocked"
                            },
                            icons: {
                                locked: "mdi-lock",
                                unlocked: "mdi-lock-open",
                            }
                        },

                        {
                            position: [0, 2],
                            type: TYPES.ALARM,
                            // id: "alarm_control_panel.home_alarm",
                            id: { state: 'disarmed' }, // replace it with real string id
                            title: '家庭报警器',
                            icons: {
                                arming: 'mdi-bell-outline',
                                disarmed: 'mdi-bell-off',
                                pending: 'mdi-bell',
                                armed_custom_bypass: 'mdi-bell-check',
                                armed_home: 'mdi-bell-plus',
                                armed_night: 'mdi-bell-sleep',
                                armed_away: 'mdi-bell',
                                triggered: 'mdi-bell-ring',
                            },
                            states: {
                                arming: 'Arming',
                                disarmed: 'Disarmed',
                                pending: 'Pending',
                                armed_custom_bypass: 'Armed custom bypass',
                                armed_home: 'Armed home',
                                armed_night: 'Armed night',
                                armed_away: 'Armed away',
                                triggered: 'Triggered',
                            },
                        },
                    ]
                },

            ]
        },

        {
            title: '设置',
            bg: './images/bg5.jpg',
            icon: 'mdi-cog-outline',
            groups: [

                {
                    title: '设置',
                    width: 3,
                    height: 3,
                    items: [
                        {
                            position: [0, 0],
                            type: TYPES.CUSTOM,
                            title: '屏幕保护',
                            id: {},
                            icon: 'mdi-monitor',
                            state: '',
                            action: function (item, entity) {
                                window.showScreensaver()
                            }
                        },
                        {
                            position: [0, 1],
                            type: TYPES.CUSTOM,
                            title: '刷新页面',
                            id: {},
                            icon: 'mdi-refresh',
                            state: '',
                            action: function (item, entity) {
                                window.Noty.addObject({ title: 'HomeAssistant', message: '重新加载页面', lifetime: 3, type: 'success' })
                                location.reload()
                            }
                        },
                        {
                            position: [0, 2],
                            type: TYPES.CUSTOM,
                            title: '全屏',
                            id: {},
                            icon: 'mdi-fullscreen',
                            state: '',
                            action: function (item, entity) {
                                document.documentElement.requestFullscreen()
                            }
                        },

                        // 第一行
                        {
                            position: [1, 0],
                            type: TYPES.CUSTOM,
                            title: '暗',
                            state: '',
                            id: {},
                            icon: 'mdi-lightbulb-outline',
                            action: function (item, entity) {
                                this.api.send({
                                    type: "call_service",
                                    domain: "light",
                                    service: 'turn_on',
                                    service_data: {
                                        entity_id: 'light.wo_de_ping_ban',
                                        brightness_pct: 1
                                    }
                                })

                                window.Noty.addObject({ title: 'HomeAssistant', message: '屏幕亮度调低', lifetime: 3, type: 'success' })
                            }
                        },
                        // 第二行
                        {
                            position: [1, 1],
                            type: TYPES.CUSTOM,
                            title: '适中',
                            state: '',
                            id: {},
                            icon: 'mdi-lightbulb-on-outline',
                            action: function (item, entity) {

                                this.api.send({
                                    type: "call_service",
                                    domain: "light",
                                    service: 'turn_on',
                                    service_data: {
                                        entity_id: 'light.wo_de_ping_ban',
                                        brightness_pct: 50
                                    }
                                })
                                window.Noty.addObject({ title: 'HomeAssistant', message: '屏幕亮度适中', lifetime: 3, type: 'success' })
                            }
                        },
                        // 第三行
                        {
                            position: [1, 2],
                            type: TYPES.CUSTOM,
                            title: '亮',
                            state: '',
                            id: {},
                            icon: 'mdi-lightbulb-on',
                            action: function (item, entity) {

                                this.api.send({
                                    type: "call_service",
                                    domain: "light",
                                    service: 'turn_on',
                                    service_data: {
                                        entity_id: 'light.wo_de_ping_ban',
                                        brightness_pct: 100
                                    }
                                })
                                window.Noty.addObject({ title: 'HomeAssistant', message: '屏幕亮度最亮', lifetime: 3, type: 'success' })
                            }
                        },
                        // 第一行
                        {
                            position: [2, 0],
                            type: TYPES.CUSTOM,
                            title: '透明主题',
                            state: 'TRANSPARENT',
                            id: {},
                            icon: 'mdi-palette-outline',
                            action: function (item, entity) {
                                tileboard.search('theme', 'TRANSPARENT')
                            }
                        },
                        // 第二行
                        {
                            position: [2, 1],
                            type: TYPES.CUSTOM,
                            title: 'WIN95主题',
                            state: 'WIN95',
                            id: {},
                            icon: 'mdi-palette-outline',
                            action: function (item, entity) {
                                tileboard.search('theme', 'WIN95')
                            }
                        },
                        // 第三行
                        {
                            position: [2, 2],
                            type: TYPES.CUSTOM,
                            title: '苹果主题',
                            state: 'HOMEKIT',
                            id: {},
                            icon: 'mdi-palette-outline',
                            action: function (item, entity) {
                                tileboard.search('theme', 'HOMEKIT')
                            }
                        },
                        {
                            position: [2, 3],
                            type: TYPES.CUSTOM,
                            title: '默认主题',
                            state: 'COMPACT',
                            id: {},
                            icon: 'mdi-palette-outline',
                            action: function (item, entity) {
                                tileboard.search('theme', 'COMPACT')
                            }
                        },
                    ]
                },
                {
                    title: '播放器',
                    width: 4,
                    height: 3,
                    items: [
                        {
                            position: [0, 0],
                            type: TYPES.CUSTOM,
                            title: '播放/暂停',
                            state: '',
                            id: {},
                            width: 1,
                            icon: 'mdi-play-pause',
                            action: function (item, entity) {
                                tileboard.audio.paused ? tileboard.audio.play() : tileboard.audio.pause()
                            }
                        },
                        {
                            position: [1, 0],
                            type: TYPES.SLIDER,
                            id: { attributes: { volume: tileboard.audio.volume * 100 } },
                            title: '音量',
                            width: 2,
                            state: false,
                            icon: 'mdi-volume-source',
                            filter: function (value) {
                                if (value) {
                                    tileboard.audio.volume = value / 100
                                }
                                return value;
                            },
                            slider: {
                                max: 100,
                                min: 0,
                                field: 'volume',
                            },
                        },
                        {
                            position: [3, 0],
                            type: TYPES.CUSTOM,
                            title: '重新播放',
                            state: '',
                            id: {},
                            width: 1,
                            icon: 'mdi-replay',
                            action: function (item, entity) {
                                tileboard.audio.currentTime = 0
                                tileboard.audio.play()
                            }
                        },
                    ]
                }
            ]
        }
    ],
}
