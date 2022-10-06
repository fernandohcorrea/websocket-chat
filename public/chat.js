$(document).ready(() => {

    const chat = {

        ws: null,

        username: null,

        cfg : {
            host : {
                ps       : '/',
                protocol : window.location.protocol,
                hostname : window.location.hostname,
                port     : window.location.port === "" ? null : `:${window.location.port}`,
                baseUrl  : window.location.origin
            },
            
            endpoint : {
                load_cfg : 'api/load_cfg'
            }
        },

        onReady: async function ()
        {
            let scope = this;
            await scope.loadCfg(scope);

            $('.onSendMsg').click(function () {
                scope.fire();
            })

            scope.ws.onmessage = (event) => {
                const dataJson = JSON.parse(event.data);
                dataJson.forEach(data => {
                    scope.addMessage(data, scope)
                });
            };
        },

        loadCfg : async (scope) => {
            let urlLoadCfg = scope.getRouteTo('load_cfg');

            let promise = await $.ajax({
                url: urlLoadCfg
            });

            scope.ws = new WebSocket('ws://localhost:44444')
            scope.ws.onopen = () => {
                console.log('Now connected');
            };
        },

        fire : function() {
            let scope = this;
            scope.username = document.getElementById('name_msg').value || '???'

            const data = [{
                username: scope.username,
                message: document.getElementById('message').value
            }];

            const dataJson = JSON.stringify(data);

            scope.ws.send(`${dataJson}`);
            document.getElementById('message').value = '';
        },

        addMessage : function(dataJson, scope){
            let msg = $("#tplCardMessageID").find('div.card-bloco').clone(true)[0];

            msg = $(msg);

            msg.find('div.card-name').html(dataJson.username);
            msg.find('p.card-message').html(dataJson.message);
            msg.find('p.card-time').html(dataJson.time);

            $("#messages").append(msg);

            if(dataJson.username == scope.username){
                $("#messages div:last-child").addClass('border-primary');
            } else {
                $("#messages div:last-child").addClass('text-right');
            }

            $("#messages div:last-child").show(1000);

            $("html, body").animate({ scrollTop: $(document).height() }, 1500);

        },

        getRouteTo : function(path) 
        {
            let scope = this;
            let pathUrl = scope.cfg.endpoint[path] ?? null;

            let urlPices = [
                `${scope.cfg.host.protocol}${scope.cfg.host.ps}`,
                scope.cfg.host.hostname,
            ].join(scope.cfg.host.ps);

            return `${urlPices}${scope.cfg.host.port}${scope.cfg.host.ps}${pathUrl}`;
        }
    };

    chat.onReady();
});
  

