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

$( document ).ready(function() {
    var d = false;
    var i = 0;
    var lol;
    
/*    $.get('http://catinder.samsung-campus.net/proxy.php', {}, function (data) {
        $('#content').html('<h2>' + data.results[0].name + '</h2>' + '<img src="' + data.results[0].picUrl + '" id="img" >');
        var json = JSON.stringify(data);
        a = json.split(',');
        console.log(a.length);
    }, 'json');*/

    $('#reg').on('touchstart', function(e) {
        slide();
    });

    $('#m_favoris').on('touchstart', function(e) {
        slide();
        $('#home').hide();
        $( "#fav" ).slideDown( "slow" );
    });

    $('#m_home').on('touchstart', function(e) {
        slide();
        hide();
        $('#home').slideDown( "slow" );
    });

    $('#home').on('touchstart', function(e) {
        if(d) {
            slide();
        }
    });

    $('#m_profil').on('touchstart', function(e) {
        slide();
        hide();
        $('#profil').slideDown( "slow" );
    });

    charge();    
    
    function charge () {
        $.get('http://catinder.samsung-campus.net/proxy.php', {}, function (data) {
            console.log(data.nbResult);
            console.log(data);
            console.log('i = ' + i);
            $('#content').html('<h2>' + data.results[i].name + '</h2>' + '<img src="' + data.results[i].picUrl + '" id="img" >');
            $('.choix').on('touchstart', function(e) {    
                i = i + 1;
                if(i <= data.nbResult - 1) {
                    console.log('i = ' + i);
                    $('#content').html('<h2>' + data.results[i].name + '</h2>' + '<img src="' + data.results[i].picUrl + '" id="img" >');
                } else {
                    i=0;
                    $('.choix').off("touchstart");
                    charge();
                }
            });

            $('#oui').on('touchstart', function(e) {
                console.log('like');
            });
            $('#non').on('touchstart', function(e) {
                console.log('deg');
            });
            
        }, 'json');
    }

    function hide () {
        $('#home').hide();
        $('#fav').hide();
        $('#profil').hide();
    }

    function slide () {
        if(d){
            $('#menu').animate({'margin-left':'-75%'},1000,false);
            d = false;
        } else {
            $('#menu').animate({'margin-left':'75%'},1000,false);
            d = true;
        }
    }
});