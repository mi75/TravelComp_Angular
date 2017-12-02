var validator = {
	rules: {
		phone : 0,
		email: 1,
		notEmpty: 2,
		charsCount: 3,
	},
	validate: function(stringToValidate, rule, additionalParameter){
		if (rule == this.rules.phone){
			return this.validatePhone(stringToValidate);
		}
	},
	
	validatePhone: function(stringToValidate){
		var simb = stringToValidate.replace(/[0-9)( +-]/g, '');
        var d = stringToValidate.match(/[0-9]/g);
        if (simb || (d.length!==12 && d.length!==10) || (d[0]!=='0' && String(d.slice(0,3)) !== '3,8,0')) {
          return false;
        }
        return true;
	},

	validateEmail: function(stringToValidate){
		var adressArray = stringToValidate.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		return (adressArray != null && adressArray.length > 0);
	},

	validateCharsCount: function(stringToValidate, numberOfChars){
		var contentwithoutspaces = stringToValidate.replace(/\s+/g, '');
		var ilength = contentwithoutspaces.length;
		return(ilength <= numberOfChars);
	}
	
}