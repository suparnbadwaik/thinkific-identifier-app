if(!Identifier) Identifier = {};
Identifier.details = (() => {

    class Details {
        constructor() {
            this._token = null;
        }

        get token() {
            return this._token;
        }
        set token(value) {
            this._token = value;
        }

        get hasToken() {
            return this._token != null;
        }

        loadHtml() {
            $('#content').append($('.details').html());
        }

        unloadHtml() {
            $("#content").empty();
        }

        current() {
            $.ajax({
                url: `${config.apiGateway}current`,
                type: 'GET',
                contentType: 'application/json',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                success: function (result) {
                    $('#current-result').val(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

        next() {
            $.ajax({
                url: `${config.apiGateway}next`,
                type: 'GET',
                contentType: 'application/json',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                success: function (result) {
                    $('#next-result').val(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        
        reset() {
            let value = $('#reset-value').val();
            $.ajax({
                url: `${config.apiGateway}current`,
                type: 'PUT',
                contentType: 'application/json',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                data: JSON.stringify({
                    current: value
                }),
                success: function (result) {
                    $('#reset-value').val('');
                    $('#reset-result').text(result);
                },
                error: function (error) {
                    console.log(error);
                    $('#reset-value').val('');
                    $('#reset-result').text(result);
                }
            });
            
        }

        viewToken(){
            $('#token-result').text(this.token);
        }

        clearToken() {
            $('#token-result').text('');
        }

    }

    return new Details();

})();
