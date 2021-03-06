$(document).ready(() => {

    const chat = {

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
        },

        loadCfg : async (scope) => {
            let urlLoadCfg = scope.getRouteTo('load_cfg');

            let promise = await $.ajax({
                url: urlLoadCfg
            });

            console.table(process);
            debugger


            // const ws = new WebSocket('ws://localhost:44444')
            // console.table(url);
            
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

   


    // const ws = new WebSocket('wss://ddd44564.ngrok.io');

    // let username = '???'

    // const getElement = (id) => document.getElementById(id);

    // const addMessage = (dataJson) => {
        
    //     var msg = $("#tplCardMessageID").find('div.card-bloco').clone(true)[0];
        
    //     msg = $(msg);

    //     msg.find('div.card-name').html(dataJson.username);
    //     msg.find('p.card-message').html(dataJson.message);
    //     msg.find('p.card-time').html(dataJson.time);

    //     $("#messages").append(msg);

    //     if(dataJson.username == username){
    //         $("#messages div:last-child").addClass('border-primary');
    //     } else {
    //         $("#messages div:last-child").addClass('text-right');
    //     }

        
    //     $("#messages div:last-child").show(1000);

    //     $("html, body").animate({ scrollTop: $(document).height() }, 1500);

    // };



    // ws.onopen = () => {
    //     console.log('Now connected');
    // };

    // ws.onmessage = (event) => {
    //     const dataJson = JSON.parse(event.data);
    //     dataJson.forEach(addMessage);
    // };


    // function fire() {
    //     username = getElement('name_msg').value || '???'

    //     const data = [{
    //         username: username,
    //         message: getElement('message').value
    //     }];

    //     const dataJson = JSON.stringify(data);

    //     ws.send(`${dataJson}`);
    //     getElement('message').value = '';
    // };

    // $('.onSendMsg').click(function () {
    //     fire();
    // })
//})
