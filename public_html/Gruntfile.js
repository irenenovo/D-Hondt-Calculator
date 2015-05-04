/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        cordovacli: {
            options: {
                path: 'myHybridAppFolder',
                cli: 'cordova'  // cca or cordova
            },
            cordova: {
                options: {
                    command: ['create', 'platform', 'plugin', 'build'],
                    platforms: ['ios', 'android'],
                    plugins: ['device', 'dialogs'],
                    path: 'myHybridAppFolder',
                    id: 'io.cordova.hellocordova',
                    name: 'HelloCordova'
                }
            },
            create: {
                options: {
                    command: 'create',
                    id: 'com.myHybridApp',
                    name: 'myHybridApp'
                }
            },
            add_platforms: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['ios', 'android']
                }
            },
            add_plugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'battery-status',
                        'camera',
                        'console',
                        'contacts',
                        'device',
                        'device-motion',
                        'device-orientation',
                        'dialogs',
                        'file',
                        'geolocation',
                        'globalization',
                        'inappbrowser',
                        'media',
                        'media-capture',
                        'network-information',
                        'splashscreen',
                        'vibration'
                    ]
                }
            },
            remove_plugin: {
                options: {
                    command: 'plugin',
                    action: 'rm',
                    plugins: [
                        'battery-status'
                    ]
                }
            },
            build_ios: {
                options: {
                    command: 'build',
                    platforms: ['ios']
                }
            },
            build_android: {
                options: {
                    command: 'build',
                    platforms: ['android']
                }
            }/*,
            emulate_android: {
                options: {
                    command: 'emulate',
                    platforms: ['android'],
                    args: ['--target', 'Nexus5']
                }
            }*/
        }
    });

    grunt.loadNpmTasks('grunt-cordovacli');

    // Default task(s).
    grunt.registerTask('default', ['cordovacli']);
};
