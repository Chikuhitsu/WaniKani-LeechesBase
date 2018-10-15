// ==UserScript==
// @name         Leeches Base
// @namespace    http://wanikani.com/
// @version      0.1
// @description  Centralized leech script configuration
// @author       Chikuhitsu
// @include      https://www.wanikani.com/dashboard
// @include      https://www.wanikani.com/
// @include      https://www.wanikani.com/critical-items
// @grant        none
// @run-at       document-body
// ==/UserScript==

/*   Copyright 2018 Chikuhitsu
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

(function(scope) {
    'use strict';

    wkof.include('Menu,Settings');
    wkof.ready('Menu,Settings')
        .then(install_menu)
        .then(load_settings);

    var defaults = {
        threshold: 1.0
    };

    function install_menu() {
        wkof.Menu.insert_script_link({
            name:      'leech_threshold_settings',
            submenu:   'Settings',
            title:     'Leech Threshold',
            on_click:  open_settings
        });
    };

    function open_settings() {
        var config = {
            script_id: 'leech_threshold',
            title: 'Leech Threshold',
            on_save: update_settings,
            content: {
                threshold: {
                    type: 'number',
                    label: 'Leech Threshold',
                    default: 1.0,
                    hover_tip: 'The threshold for items to be considered leeches',
                },
            }
        }
        var dialog = new wkof.Settings(config);
        dialog.open();
    }

    function load_settings() {
        return wkof.ready('Settings').then(() => wkof.Settings.load('leech_threshold', defaults));
    };

    function update_settings() {
        wkof.ready('Settings').then(() => wkof.Settings.save('leech_threshold'));
    };

    //Access to the configured threshold value for other scripts.
    scope.leeches = {};
    //Returns a promise that resolves to the configured threshold
    scope.leeches.getLeechThreshold = function() {
        return load_settings().then(settings => wkof.settings.leech_threshold.threshold);
    };
})(window);
