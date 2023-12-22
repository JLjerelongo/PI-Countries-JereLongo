const validation = (activity) => {
    const errors = {};
    const activityNumber = Number(activity.myDificulty);
    const validName = /^[^\d!@#\$%\^&*\(\)-_+=\[\]\{\};:'",.<>\/?\\|`~]*$/;

    if(!validName.test(activity.name)) errors.name = 'The activity name can only have letter!';
    else if(!activity.name.length) errors.name = 'The activity must has a name!';

    if(!activityNumber) errors.dificulty = 'The activity must have a dificulty!';

    if(!activity.season) errors.season = 'The activity must have a season!';

    return errors;
}

export default validation;