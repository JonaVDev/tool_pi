import { standardResponses } from './standardResponses.js';
import { standardCompliance } from './standardCompliance.js';
import { infraType } from './infraType.js';
import { cloudProvider } from './cloudProvider.js';
import { infraStatus } from './infraStatus.js';
import { techAnalysis } from './techAnalysis.js';
import { infraInventory } from './infraInventory.js';
import { communication } from './communication.js';
import { channelType } from './channeltype.js';
import { additionalLayers } from './additionalLayers.js';
import { resourceAnalysis } from './resourceAnalysis.js';
import { volumetryAnalysis } from './volumetryAnalysis.js';
import { stackSupported } from './stackSupported.js';

let imagesArray = [];
const appVersionBuild = "Version 1.0.0"

document.addEventListener('DOMContentLoaded', contentLoaded);

function contentLoaded() {
    const createComment = document.getElementById('create_comment');
    const copyComment = document.getElementById('copy_comment');
    const evidence = document.getElementById('image-paste');
    const clearContent = document.getElementById('clear_content');
    const removeEvidenceBtn = document.getElementById('removeEvidenceBtn');

    updateVersion();
    standardResponse();
    standardComplianceResponse();
    createSelects('tipoInfra', infraType);
    createSelects('proveedorNube', cloudProvider);
    createSelects('infraExistente', infraStatus);
    createSelects('analisisTecnologias', techAnalysis);
    createSelects('inventarioInfra', infraInventory);
    createSelects('tipoConsumo', communication);
    createSelects('tipoComunicacion', channelType);
    createSelects('capasAdicionalesConsumo', additionalLayers);
    createSelects('analisisRecursos', resourceAnalysis);
    createSelects('analisisVolumetria', volumetryAnalysis);
    createSelects('stackTecnologico', stackSupported);

  
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

function standardResponse(){

    const selectIDs = ['quickDiscovery','solutioning','acercamientoArq','acercamientoFinOps'];
    
    const selects = selectIDs.map(id => document.getElementById(id));

    selects.forEach(select => {
        createDefaultOption(select);
        standardResponses.forEach(response => {
            createOptionSelect(select, response);
        });
    });
}


function createSelects(selectID, optionsArray) {
    const select = document.getElementById(selectID);
    if (!select) return;

    createDefaultOption(select);
    optionsArray.forEach(option => {
        createOptionSelect(select, option);
    });

}


function standardComplianceResponse(){
    const selectIDs = ['diagramaArquitectura','idPresupuesto','preCertificado'];
    const selects = selectIDs.map(id => document.getElementById(id));

    selects.forEach(select => {
        createDefaultOption(select);
        standardCompliance.forEach(response => {
            createOptionSelect(select, response);
        });
    });
}

function createDefaultOption (servicio){
    while (servicio.firstChild) {
        servicio.removeChild(servicio.firstChild);
    }

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona una opción";
    defaultOption.disabled = false;
    defaultOption.selected = false;
    servicio.appendChild(defaultOption);

    if (servicio.id=="servicio"){
        const projectID =document.getElementById('proyectoAfore');
        console.log(projectID)
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
    const idsData = [
        'quickDiscovery', 'solutioning', 'acercamientoArq', 'preCertificado',
        'acercamientoFinOps', 'idPresupuesto', 'diagramaArquitectura', 'fechaCompromiso',
        'tipoInfra', 'proveedorNube', 'infraExistente', 'inventarioInfra',
        'analisisTecnologias', 'numeroMicroservicios', 'analisisRecursos', 'analisisVolumetria',
        'stackTecnologico', 'stackVersion', 'tipoConsumo', 'tipoComunicacion',
        'hostName', 'capasAdicionalesConsumo', 'comentarios'
    ];

    const arrayData = idsData.reduce((acc, id) => {
        acc[id] = document.getElementById(id)?.value ?? '';
        return acc;
    }, {});

    message += `<b>Resumen:</b><br>
                <br>
                <ul>
                    <li><b>Quick Discovery:</b> ${arrayData.quickDiscovery}</li>
                    <li><b>Solutioning:</b> ${arrayData.solutioning}</li>
                    <li><b>Acercamiento Arquitectura:</b> ${arrayData.acercamientoArq}</li>
                    <li><b>Pre Certificado:</b> ${arrayData.preCertificado}</li>
                    <li><b>Acercamiento FinOps:</b> ${arrayData.acercamientoFinOps}</li>
                    <li><b>ID Presupuesto:</b> ${arrayData.idPresupuesto}</li>
                    <li><b>Diagrama Arquitectura:</b> ${arrayData.diagramaArquitectura}</li>
                    <li><b>Fecha Compromiso:</b> ${arrayData.fechaCompromiso}</li>
                </ul>`;
    message += `<br><b>Infraestructura:</b><br>
                <br>
                <ul>
                    <li><b>Tipo Infra:</b> ${arrayData.tipoInfra}</li>
                    <li><b>Proveedor Nube:</b> ${arrayData.proveedorNube}</li>
                    <li><b>Infra Existente:</b> ${arrayData.infraExistente}</li>
                    <li><b>Inventario Infra:</b> ${arrayData.inventarioInfra}</li>
                    <li><b>Análisis Tecnologías:</b> ${arrayData.analisisTecnologias}</li>
                    <li><b>Número Microservicios:</b> ${arrayData.numeroMicroservicios}</li>
                    <li><b>Análisis Recursos:</b> ${arrayData.analisisRecursos}</li>
                    <li><b>Análisis Volumetría:</b> ${arrayData.analisisVolumetria}</li>
                    <li><b>Stack Tecnológico:</b    > ${arrayData.stackTecnologico}</li>
                    <li><b>Stack Version:</b> ${arrayData.stackVersion}</li>
                    <li><b>Tipo Consumo:</b> ${arrayData.tipoConsumo}</li>
                    <li><b>Tipo Comunicación:</b> ${arrayData.tipoComunicacion}</li>
                    <li><b>Host Name:</b> ${arrayData.hostName}</li>
                    <li><b>Capas Adicionales Consumo:</b> ${arrayData.capasAdicionalesConsumo}</li>
                </ul>`;

    if (arrayData.comentarios != "") {
        const lines = arrayData.comentarios.split('\n').filter(line => line.trim() !== '');
        let finalComment = '';
        lines.forEach( line => {
            finalComment += `<p class="p_comment">${escapeHTML(line)}</p>`;
        });
        message += `<br><b>Comentarios adicionales:</b><br><br>`;
        message += `${finalComment}`;
        message += `<br>`;
    }



    imagesArray.forEach(url => {
        message += `<br><img src="${url}"><br>`;
    });
    output.innerHTML = message;
    
}   

function clearAllFields() {
    const elementsToClear = [
        'quickDiscovery', 'solutioning', 'acercamientoArq', 'preCertificado',
        'acercamientoFinOps', 'idPresupuesto', 'diagramaArquitectura', 'fechaCompromiso',
        'tipoInfra', 'proveedorNube', 'infraExistente', 'inventarioInfra',
        'analisisTecnologias', 'numeroMicroservicios', 'analisisRecursos', 'analisisVolumetria',
        'stackTecnologico', 'stackVersion', 'tipoConsumo', 'tipoComunicacion',
        'hostName', 'capasAdicionalesConsumo', 'comentarios'
    ];


    for (const id of elementsToClear) {
        const elementToClear = document.getElementById(id);
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
    output.innerHTML = '<img id="SCM" name="SCM" src="static/images/SCM.png" alt="SCM">';
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