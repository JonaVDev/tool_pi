import { apiApigee } from "./apiApigee.js";

let imagesArray = [];
const appVersionBuild = "Version 5.6.1"

document.addEventListener('DOMContentLoaded', contentLoaded);

function contentLoaded() {
    const createComment = document.getElementById('create_comment');
    const copyComment = document.getElementById('copy_comment');
    const evidence = document.getElementById('image-paste');
    const clearContent = document.getElementById('clear_content');
    const removeEvidenceBtn = document.getElementById('removeEvidenceBtn');

    const projectID = document.getElementById('proyectoAfore')
    const tecnologia = document.getElementById('tecnologia');
    createTipoOptions();
    createCloudOptions();
    createResources();
    createProjectOptions();
    creteFeedbackOptions();
    createResultOptions();
    createStageEnvs();
    createStacks();
    updateVersion();

    if (projectID || tecnologia ) {
        projectID.addEventListener('change',showTech)   
    }
    if (tecnologia ) {
        tecnologia.addEventListener('change',showTech)
    }  
    if (createComment) {
        createComment.addEventListener('click', postComment);
    }
    if (copyComment) {
        copyComment.addEventListener('click', copyCommentC);
    }
    if (evidence) {
        evidence.addEventListener('paste', loadEvidence);
        evidence.addEventListener('keydown', function(event) {
            if  (event.key == 46 || event.key === 'Delete') {
                cleanEvidence();
                console.log('Delete key pressed');
            }
        });
    }

    if (removeEvidenceBtn){
        removeEvidenceBtn.addEventListener('click', cleanEvidence);
    }

    if (clearContent) {
        clearContent.addEventListener('click', clearAllFields)
    }
    
}

function updateVersion(){
    const appVersion = document.getElementById('appVersion');
    appVersion.value = appVersionBuild;
    appVersion.textContent = appVersionBuild;
}


function createOptionSelect (selectToProcess, optionValue, optionText = optionValue) {

    const newOption = document.createElement('option');
    newOption.value = optionValue;
    newOption.textContent = optionText;
    selectToProcess.append(newOption);
    return selectToProcess;
}

function createResultOptions(){
    const selectResult = document.getElementById('resultado');
    createDefaultOption(selectResult);
    Object.keys(dictResultado).forEach((resultado, index) => {
        if (index ===0){
            return;
        }
        const textinfo = dictResultado[resultado][1];
        createOptionSelect(selectResult,resultado, textinfo);
    });
}

function creteFeedbackOptions(){
    const selectFeedback = document.getElementById('feedback');
    createDefaultOption(selectFeedback);
    
    Object.keys(dictFeedback).forEach((feedback) => {
        const textinfo = dictFeedback[feedback];
        createOptionSelect(selectFeedback, feedback, textinfo);
    });
}

function createTipoOptions(){
    const selectTipo = document.getElementById('tipo');
    createDefaultOption(selectTipo);

    Object.entries(dictTipo).forEach(([category, taskType]) => {
        const group = document.createElement('optgroup');
        group.label = category;

        Object.entries(taskType).forEach(([key, value]) =>{
            createOptionSelect(group, key, value);
        });
        selectTipo.append(group);
    });
}

function createStacks(){
    const selectTecnologia = document.getElementById('tecnologia');
    createDefaultOption(selectTecnologia);
    stacks.forEach(stack => {
        createOptionSelect(selectTecnologia, stack);
    });
    
}

function createResources(){
    const selectResources = document.getElementById('resources');
    createDefaultOption(selectResources);
    resources.forEach(resource => {
        createOptionSelect(selectResources, resource);
    });
    
}
function createCloudOptions(){
    const selectCloudClasses = document.getElementById('cloudClasses');
    createDefaultOption(selectCloudClasses);
    cloudClasses.forEach(cloudClass => {
        createOptionSelect(selectCloudClasses, cloudClass);
    });
    
}

function createStageEnvs(){
    const selectStageEnv = document.getElementById('stage');
    createDefaultOption(selectStageEnv);

    Object.entries(stageEnvs).forEach(([category, stageType]) =>{
        const group = document.createElement('optgroup');
        group.label = category;

        Object.entries(stageType).forEach(([key, value]) =>{
            createOptionSelect(group, key, value);
        });
        selectStageEnv.append(group);
    });
    // Object.keys(stageEnvs).forEach(stageEnv => {
    //     createOptionSelect(selectStageEnv, stageEnv);
    // });
}

function createProjectOptions(){
    const selectProject = document.getElementById('proyectoAfore');
    createDefaultOption(selectProject);

    Object.entries(projects).forEach(([category, bizGroup]) => {
        const group = document.createElement('optgroup');
        group.label = category;

        bizGroup.forEach((projectName) => {
            createOptionSelect(group, projectName);
        });
        selectProject.append(group);
    });
    
    
    
    // .forEach(project => {
    //     createOptionSelect(selectProject, project);
    // });
}


function setTheme(themeName){
    if (themeName === document.body.classList.value){
        document.body.classList.toggle(themeName);
    } else {
        document.body.classList.remove('dark-mode', 'hacker-mode', 'pony-mode');
        document.body.classList.add(themeName);
    }
    updateMichiImage();
}

function updateMichiImage(){
    const michi = document.getElementById('michi');
    if (document.body.classList.contains('pony-mode')) {
        michi.src = 'static/images/my_cat_unicorn.png';
    } else {
        michi.src = 'static/images/my_cat.png';
    }
}


function createDefaultOption (servicio){
    while (servicio.firstChild) {
        servicio.removeChild(servicio.firstChild);
    }

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona una opción";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    servicio.appendChild(defaultOption);

    if (servicio.id=="servicio"){
        const projectID =document.getElementById('proyectoAfore');
        console.log(projectID)
    }
    
}

function createApiOptions (apis, servicio, proyecto){
    console.log (proyecto.value);
    console.log (apis[proyecto.value]);
    apis[proyecto.value].forEach(api => {
        const apiOption = document.createElement('option');
        apiOption.value = api;
        apiOption.textContent = api;
        servicio.appendChild(apiOption)
    });
}


function showTech() {
    console.log("I'm being called")
    const servicio = document.getElementById('servicio');
    const tecnologia = document.getElementById('tecnologia');
    const proyecto = document.getElementById('proyectoAfore');
    console.log(tecnologia.value);
    console.log(tecnologia);
    console.log(proyecto.value);
    if (tecnologia.value && proyecto.value) {
        createDefaultOption (servicio);
        switch (tecnologia.value) {
            case 'Angular':
                createApiOptions (apiAngular,servicio, proyecto);
                break;
            case 'Springboot':
                createApiOptions (apiSpringboot,servicio, proyecto);
                break;
            case 'Apigee':
                createApiOptions (apiApigee, servicio, proyecto);
                break;
            case 'Mulesoft':
                createApiOptions (apiMulesoft, servicio, proyecto);
                break;
            case 'Modyo':
                createApiOptions (modyo, servicio, proyecto);
                break;
            case 'Python':
                createApiOptions (apiPython, servicio, proyecto);
                break;
            case 'Flask':
                createApiOptions (apiPython, servicio, proyecto);
                break;
            case 'ScriptsSQL':
                createApiOptions (scriptsSQL, servicio, proyecto);
                break;
            case 'SIWEB':
                createApiOptions (apiSIWEB, servicio, proyecto);
                break;
            case 'Springboot, Mulesoft, Apigee':
                createApiOptions (apiTodos, servicio, proyecto);
                break;
        }
    } 
    else {
        console.log('Arregla esto luego');
    }
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


async function loadEvidence(event) {
    event.preventDefault();
    const clipboardItems = event.clipboardData.items;
    const promises = [];

    for (const item of clipboardItems) {
        if (item.kind == 'file' && item.type.startsWith('image/')) {
            const imageFile = item.getAsFile();
            promises.push(getBase64(imageFile));
        }
    }

    const base64Images = await Promise.all(promises);
    imagesArray.push(...base64Images);
    const evidence = document.getElementById('image-paste');
    evidence.innerHTML = '';
    let innerHTMLString = '';
    imagesArray.forEach(url => {
        innerHTMLString += `<br><img src="${url}" style="max-width: 100%; height: auto; display: block; margin-top: 10px;"><br>`;
    });

    evidence.innerHTML = innerHTMLString;

}

async function cleanEvidence() {
    const evidence = document.getElementById('image-paste');
    imagesArray = [];
    evidence.innerHTML = '';
    evidence.innerHTML = `<p>Pega tus evidencias aqui.</p>`;
    
}

function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function postComment() {

    let message = ``;
    const tipo = document.getElementById('tipo');
    const stage = document.getElementById('stage');
    const tecnologia = document.getElementById('tecnologia');
    const servicio = document.getElementById('servicio');
    const namespace = document.getElementById('namespace');
    const resultado = document.getElementById('resultado');
    const output = document.getElementById('output');
    const feedback = document.getElementById('feedback');
    const commentarios = document.getElementById('comentarios');
    const codeComment = document.getElementById('code-comment');
    const ticket = document.getElementById('ticket');
    const proyectoAfore = document.getElementById('proyectoAfore');
    const stackVer = document.getElementById('stackVer');
    const cloudClasses = document.getElementById('cloudClasses');
    const resources = document.getElementById('resources');

    const infoHeader = dictTipo[tipo.value] || tipo.value;
    message = `<b>${proyectoAfore.value} || ${infoHeader} ${ticket.value}</b>`;
    message += `<br><br>
            <b>Descripción:</b><br>
            <br>`;
    message += getMessage(tipo);
    message += `<ul>`;
    message +=`<li><b>${stage.value}</b></li>` 
    message += '</ul>';

    if ( tecnologia.value != "") {
        message += `Impacta en la tecnologia:<br>
                    <ul> 
                    <li><b>${tecnologia.value}</b></li>
                    </ul>`;
    }
    if (servicio.value !="") {
        message += `Para el/los servicio(s):<br>
                    <ul>
                    <li><b>${servicio.value}</b></li>
                    </ul>`;
    }

    message += `<br>
                <b>Detalles:</b><br>
                <br>
                Actividad: <i>${tipo.value}</i><br>
                Ambiente/Plataforma: <i>${stage.value}</i><br>`

    if (( servicio.value !="")){
        message += `Servicio: <i>${servicio.value}</i><br>`;  
    }
    if (( tecnologia.value !="")){
        message += `Tecnologia: <i>${tecnologia.value}</i><br>`;  
    }
    if (stackVer.value != "") {
        message+= `Framework/Stack version: `;
        message+= `<i>${stackVer.value}</i><br>`;
        }
    if (namespace.value != "") {
        message += `NameSpace: `;
        message += `<i>${namespace.value}</i><br>`;    
        }
    if (resources.value != "") {
        message += `Recurso: `;
        message += `<i>${resources.value}</i><br>`;    
        }
    if (cloudClasses.value != "") {
        message += `Cloud/On-premise: `;
        message += `<i>${cloudClasses.value}</i><br>`;
    }    
    if (feedback.value != "") {
        message += `<br><b>${feedback.value}</b><br><br>`;
    }
    if (commentarios.value != "") {
        const lines = commentarios.value.split('\n').filter(line => line.trim() !== '');
        let finalComment = '';
        lines.forEach( line => {
            finalComment += `<p class="p_comment">${escapeHTML(line)}</p>`;
        });
        message += `<br><b>Comentarios adicionales:</b><br><br>`;
        message += `${finalComment}`;
        message += `<br>`;
    }
    if (codeComment.value != "") {
        const lines = codeComment.value.split('\n').filter(line => line.trim() !== '');
        let finalCodeComment = '';
        lines.forEach(line => {
            finalCodeComment += `<code>${escapeHTML(line)}</code><br>`;
        });
        message += `<br><b>Informacion técnica/Código relacionado:</b><br><pre><p class="p_code"><b>${finalCodeComment}</b></p></pre>`
    }

    const infoResult = dictResultado[resultado.value][0](resultado) || resultado.value;
    message += `${infoResult}`;


    imagesArray.forEach(url => {
        message += `<br><img src="${url}"><br>`;
    });
    output.innerHTML = message;
    
}   

function clearAllFields() {
    const elementsToClear = [
        document.getElementById('ticket'),
        document.getElementById('tipo'),
        document.getElementById('stage'),
        document.getElementById('tecnologia'),
        document.getElementById('servicio'),
        document.getElementById('resultado'),
        document.getElementById('namespace'),
        document.getElementById('feedback'),
        document.getElementById('comentarios'),
        document.getElementById('code-comment'),
        document.getElementById('proyectoAfore'),
        document.getElementById('stackVer'),
        document.getElementById('cloudClasses'),
        document.getElementById('resources')
    ];


    for (const elementToClear of elementsToClear) {
        if (elementToClear) {
            elementToClear.value = "";
            if (elementToClear.tagName === 'FIELDSET') {
                elementToClear.remove();
            }
        }
    }

    const output = document.getElementById('output');
    const evidence = document.getElementById('image-paste');
    evidence.innerHTML = `<p>Pega tus evidencias aqui.</p>`;
    output.innerHTML = '<img id="michi" name="michi" src="static/images/my_cat.png" alt="cat coughing">';
    imagesArray = [];
}

async function copyCommentC() {
    const output = document.getElementById('output');
    const blob = new Blob([output.innerHTML], { type: 'text/html' });
    const clipboardItem = new ClipboardItem({ 'text/html': Promise.resolve(blob) });
    try {
        await navigator.clipboard.write([clipboardItem]);
        alert('Copiado al portapapeles');
        
    } catch (err) {
        console.error('Se fallo al copiar', err);
        alert('Failed to copy content.');
    }
}