app.service('Helper', ['$http', '$q', function ($http, $q) {

    var s = {};

    s.isJson = function(str) {
        if(str != 'null'){
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true

        }else {
            return false;
        }
    };

    s.formatAge = function(ageDecimal) {
        if(!ageDecimal){
            return "";
        }
        var age =  ageDecimal.split('.');
        var ret = '';
        if(age[0] == 1){
            ret = '1 year ';
        }else if(age[0] > 1){
            ret = age[0]+" yrs ";
        }

        if(age[1] == 1){
            ret += "1 month";
        }else if(age[1] > 1){
            ret += age[1]+ " months";
        }
        return ret;
    };

    s.formatDayTimeFromMinutes = function (minutes) {
        if(minutes){
            return moment(minutes, "X").format("hh:mm A")
        }else{
            return "";
        }
    };

    s.formatMealPlanTimeFromMin = function (minutes) {
        if(minutes){
            return moment('12:00 AM','hh:mm A').add(minutes, 'minutes').format("hh:mm")
        }else{
            return "";
        }
    };

    s.formatMealPlanPeriodFromMin = function (minutes) {
        if(minutes){
            return moment('12:00 AM','hh:mm A').add(minutes, 'minutes').format("A")
        }else{
            return "";
        }
    };

    s.formatDayHoursFromMinutes = function (minutes) {
        if(minutes){
            return moment(minutes, "X").format("hh:mm")
        }else{
            return "";
        }
    };

    s.formatDayPeriodFromMinutes = function (minutes) {
        if(minutes){
            return moment(minutes, "X").format("A")
        }else{
            return "";
        }
    };

    s.isValidDate = function (date_param) {
        if(moment(date_param).toDate() == 'Invalid Date'){
            return false;
        }else{
            return true;
        }
    };

    s.getDateFormat = function (date_param, f) {
        if(moment(date_param).toDate() == 'Invalid Date'){
            return '';
        }else{
            return moment(date_param).format(f);
        }
    };

    s.getServingUnitName = function (unitParam) {
        var unit = {};
        if(unitParam.name){
            unit = unitParam;
        }else{
            unit = {name: unitParam[2] , quantity: unitParam[1] ,volume: unitParam[7]}
        }


        var str =  unit.name;

        if(unit.volume != null && unit.volume == '-'){

        }else if(unit.volume != null && unit.volume != 'gm' && unit.volume.length > 0){
            str += ' ('+unit.volume+')';
        }else{
            str += ' ('+unit.quantity +' gm'+')';
        }

        return str;
    };

    return s;
}]);

