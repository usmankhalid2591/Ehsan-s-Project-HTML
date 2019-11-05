"use strict";

var landlordStudioAnalytics = (function () {
    var branchIOVersion = "2.49.0";

    var analysers = [];
    var hasLoadedAnalysers = false;

    function loadAnalysers() {
        if (!hasLoadedAnalysers) {

            (function (b, r, a, n, c, h, _, s, d, k) { if (!b[n] || !b[n]._q) { for (; s < _.length;)c(h, _[s++]); d = r.createElement(a); d.async = 1; d.src = "https://cdn.branch.io/branch-" + branchIOVersion + ".min.js"; k = r.getElementsByTagName(a)[0]; k.parentNode.insertBefore(d, k); b[n] = h } })(window, document, "script", "branch", function (b, r) { b[r] = function () { b._q.push([r, arguments]) } }, { _q: [], _v: 1 }, "addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking".split(" "), 0);

            analysers.push({
                name: 'branch.io',

                hasIdentity: false,

                init: function (apiKey) {
                    branch.init(apiKey, function (err, data) {
                        if (err) {
                            console.log('Analytics Error', name, 'init', 'error', err, 'data', data);
                        }
                    });
                },

                setIdentity: function (identityKey) {
                    if (identityKey) {
                        branch.setIdentity(identityKey.toString(), function (err, data) {
                            if (err) {
                                console.log('Analytics Error', name, 'setIdentity', 'error', err, 'data', data);
                            }
                        });
                    }
                },

                logout: function () {
                    branch.logout(function (err, data) {
                        if (err) {
                            console.log('Analytics Error', name, 'logout', 'error', err, 'data', data);
                        }
                    });
                },

                logRegistration: function (channel, description) {
                    branch.logEvent(
                        'COMPLETE_REGISTRATION',
                        {
                            description: description,
                            method: channel
                        },
                        function (err, data) {
                            if (err) {
                                console.log('Analytics Error', name, 'logRegistration', 'error', err, 'data', data);
                            }
                        });
                },

                logTest: function (meta) {
                    branch.logEvent(
                        'TEST_EVENT',
                        meta,
                        function (err, data) {
                            if (err) {
                                console.log('Analytics Error', name, 'logTest', 'error', err, 'data', data);
                            }
                        });
                },
            });
        }

        hasLoadedAnalysers = true;
    }

    function init(apiKey) {
        loadAnalysers();
        analysers.filter(function (analyser) {
            return analyser !== undefined && typeof analyser.init === 'function';
        }).forEach(function (analyser) {
            analyser.init(apiKey);
        });
    }

    function setIdentity(identityKey) {
        analysers.filter(function (analyser) {
            return analyser !== undefined && typeof analyser.setIdentity === 'function';
        }).forEach(function (analyser) {
            analyser.setIdentity(identityKey);
            analyser.hasIdentity = true;
        });
    }

    function logout() {
        analysers.filter(function (analyser) {
            return analyser !== undefined && typeof analyser.logout === 'function';
        }).forEach(function (analyser) {
            analyser.logout();
        });
    }

    function logRegistration(channel) {
        analysers.filter(function (analyser) {
            return analyser !== undefined && typeof analyser.logRegistration === 'function';
        }).forEach(function (analyser) {
            analyser.logRegistration(channel, 'User completed registration');
        });
    }

    function logTest(meta) {
        analysers.filter(function (analyser) {
            return analyser !== undefined && typeof analyser.logTest === 'function';
        }).forEach(function (analyser) {
            analyser.logTest(meta, 'Test for logging an event from the website integration');
        });
    }

    return {
        init: init,
        setIdentity: setIdentity,
        logout: logout,
        logRegistration: logRegistration,
        logTest: logTest,
    };
})();