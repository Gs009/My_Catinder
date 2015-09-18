/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

/*jslint browser: true, node: true */
/*global $, slide, hide, charge */
"use strict";
$(document).ready(function () {
    var d = false,
        i = 0,
        m = 0,
        l = 0,
        o = 0,
        tabL,
        tabB,
        json;
    $('#reg').on('touchstart', function () {
        slide();
    });

    $('#m_favoris').on('touchstart', function () {
        slide();
        $('#home').hide();
        $("#fav").slideDown("slow");
        if (localStorage.getItem('like') !== null) {
            var tab = localStorage.getItem('like').split('_ _');
            console.log(tab.length);
            for (l = 0; l < tab.length; l += 1) {
                json = JSON.parse(tab[l]);
                $('#fav').append('<h2> ' + json.name + ' </h2>' + '<p> ' + json.age + ' </p>' + '<img src="' + json.img + '" class="liste" >');
            }
        } else {
            $('#fav').html('<h2> Vous n\' avez pas de favoris </h2>');
        }
    });

    $('#m_home').on('touchstart', function () {
        slide();
        hide();
        $('#home').slideDown("slow");
    });

    $('#home').on('touchstart', function () {
        if (d) {
            slide();
        }
    });

    $('#m_profil').on('touchstart', function () {
        slide();
        hide();
        $('#profil').slideDown("slow");
        if (localStorage.getItem('like') !== null) {
            $('#profil').append('<button id="init">Renitialiser l\'application</button>');
        }
    });

    $('#init').on('touchstart', function () {
        console.log('ok');
        localStorage.clear();
    });


    charge();
    function charge() {
        var match = false;
        $.get('http://catinder.samsung-campus.net/proxy.php', {}, function (data) {
            console.log(data);
            console.log(i);

            if (localStorage.getItem('like') !== null) {
                tabL = localStorage.getItem('like').split('_ _');
                for (o = 0; o < tabL.length; o += 1) {
                    json = JSON.parse(tabL[o]);
                    console.log(json.sha1);
                    console.log(data.results[i].sha1);
                    if (json.sha1 === data.results[i].sha1) {
                        console.log('match');
                        match = true;
                    }
                }
            }

            if (localStorage.getItem('black') !== null) {
                tabB = localStorage.getItem('black').split('_ _');
                for (o = 0; o < tabB.length; o += 1) {
                    json = JSON.parse(tabB[o]);
                    console.log(json.sha1);
                    console.log(data.results[i].sha1);
                    if (json.sha1 === data.results[i].sha1) {
                        console.log('match');
                        match = true;
                    }
                }
            }

            if (match) {
                charge();
                i = 0;
            } else {
                $('#content').html('<h2>' + data.results[i].name + '</h2>' + '<img src="' + data.results[i].picUrl + '" id="img" >');
            }

            $('.choix').on('touchstart', function () {
                console.log('click');
                i = i + 1;
                m = i - 1;

                if (i <= data.nbResult - 1) {
                    if (localStorage.getItem('like') !== null) {
                        tabL = localStorage.getItem('like').split('_ _');
                        for (o = 0; o < tabL.length; o += 1) {
                            json = JSON.parse(tabL[o]);
                            console.log(json.sha1);
                            console.log(data.results[i].sha1);
                            if (json.sha1 === data.results[i].sha1) {
                                console.log('match');
                                match = true;
                            }
                        }
                    }

                    if (localStorage.getItem('black') !== null) {
                        tabB = localStorage.getItem('black').split('_ _');
                        for (o = 0; o < tabB.length; o += 1) {
                            json = JSON.parse(tabB[o]);
                            console.log(json.sha1);
                            console.log(data.results[i].sha1);
                            if (json.sha1 === data.results[i].sha1) {
                                console.log('match');
                                match = true;
                            }
                        }
                    }

                    if (match) {
                        i = 0;
                        $('.choix').off("touchstart");
                        charge();
                    } else {
                        $('#content').html('<h2>' + data.results[i].name + '</h2>' + '<img src="' + data.results[i].picUrl + '" id="img" >');
                    }
                } else {
                    i = 0;
                    $('.choix').off("touchstart");
                    charge();
                }
            });

            $('#oui').on('touchstart', function () {
                var obj = {
                        sha1:   data.results[m].sha1,
                        img:    data.results[m].picUrl,
                        name:    data.results[m].name,
                        age:    data.results[m].age
                    };

                if (localStorage.getItem('like') !== null) {
                    localStorage.setItem('like', localStorage.getItem('like') + '_ _' + JSON.stringify(obj));
                } else {
                    localStorage.setItem('like', JSON.stringify(obj));
                }
            });

            $('#non').on('touchstart', function () {
                var obj = {
                        sha1:   data.results[m].sha1,
                        img:    data.results[m].picUrl,
                        name:    data.results[m].name,
                        age:    data.results[m].age
                    };

                if (localStorage.getItem('black') !== null) {
                    localStorage.setItem('black', localStorage.getItem('black') + '_ _' + JSON.stringify(obj));
                } else {
                    localStorage.setItem('black', JSON.stringify(obj));
                }
            });
        }, 'json');
    }

    function hide() {
        $('#home').hide();
        $('#fav').hide();
        $('#profil').hide();
    }

    function slide() {
        if (d) {
            $('#menu').animate({'margin-left': '-75%'}, 1000, false);
            d = false;
        } else {
            $('#menu').animate({'margin-left': '75%'}, 1000, false);
            d = true;
        }
    }
});