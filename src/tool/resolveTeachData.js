

export function filterSubject(teachData, courseTime, stage) {

    courseTime != 'Super Star' && (courseTime = courseTime + '课时');
    let subjectObj = teachData[courseTime][stage];
    let subjects = [];
    for(let sub in subjectObj) {
        let subItem = {label:sub, val: subjectObj[sub]};
        subjects.push(subItem);
    }
    return subjects;
}

export function sessionToArray(sessionObj) {
    let sessions = [];
    for(let session in sessionObj) {
        let sessionItem = {label: session, val: sessionObj[session]};
        sessions.push(sessionItem);
    }
    return sessions;
}

export function filterType(data){
    let types = [];
    for(let type in WeeklyData) {
        if(type != "请选择"){
            let typeItem = {label:type, val: data[type]};
            types.push(typeItem);
        }
    }
    return types;
}

export function stageToArray(stageObj) {

    let stages = [];
    for(let stage in stageObj) {
        let stageItem = {label: stage, val: stageObj[stage]};
        stages.push(stageItem);
    }
    return stages;
}

export function subjectToArray(subjectObj) {

    let subjects = [];
    for(let subject in subjectObj) {
        let subjectItem = {label: subject, val: subjectObj[subject]};
        subjects.push(subjectItem);
    }
    return subjects;
}

export function getTypeByStage(stage) {
    if(stage.indexOf('K-Fun') != -1 || 
       stage.indexOf('J-Fun') != -1 ||
       stage.indexOf('stage') != -1) {
        return 128;
    } else if(stage.indexOf('leve') != -1) {
        return 192;
    } else if(stage.indexOf('SS') != -1) {
        return 'Super Star'
    }
}