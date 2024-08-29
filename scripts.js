const thead = document.getElementById('id-thead');
const tbody = document.getElementById('id-tbody');
const titulo = document.getElementById('titulo');
const selectElement = document.getElementById('opciones');



document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');

    hamburgerBtn.addEventListener('click', function () {
        alert("Desarrollado por Albin Liang C14207")
    });
});



function depreciacionLineaRecta(valorLibros, ValorRescate, vidaUtil) {
    let depreciacionAnual = (valorLibros - ValorRescate) / vidaUtil;
    return depreciacionAnual;
}

function mostrarTablaLineaRecta(thead) {
    let tiempo = selectElement.value == '1' ? 'anual' : 'mensual';

    thead.innerHTML =
        `
          <th>Año</th>
          <th>Depreciación ${tiempo}</th>
          <th>Depreciación acumulada</th>
          <th>Valor en libros</th>
        `;
}

function obtenerLineaRecta(thead, tbody, valorLibros, ValorRescate, vidaUtil) {
    mostrarTablaLineaRecta(thead);
    let depreciacionAcumulada = 0;
    let depreciacionAnual = depreciacionLineaRecta(valorLibros, ValorRescate, vidaUtil);
    let nuevoValorLibros = 0;
    tbody.innerHTML = '';
    for (let i = 0; i <= vidaUtil; i++) {
        if (i == 0) {
            tbody.innerHTML +=
                `
        <td style="font-weight: bold;">0</td>
        <td>-</td>
        <td>-</td>
        <td>${valorLibros}</td>
        `;
        } else {
            depreciacionAcumulada = depreciacionAcumulada + depreciacionAnual;
            nuevoValorLibros = valorLibros - depreciacionAcumulada;
            tbody.innerHTML +=
                `
        <td style="font-weight: bold;">${i}</td>
        <td>${selectElement.value == '1' ? depreciacionAnual : depreciacionAnual / 12}</td>
        <td>${depreciacionAcumulada}</td>
        <td>${nuevoValorLibros}</td>
        `;

        }
    }
}




function validateForm(button) {
    // Limpiar errores anteriores
    document.getElementById('valorLibrosError').innerText = '';
    document.getElementById('valorRescateError').innerText = '';
    document.getElementById('vidaUtilError').innerText = '';

    // Obtener valores de los campos
    const valorLibros = document.getElementById('valorLibros').value.trim();
    const valorRescate = document.getElementById('valorRescate').value.trim();  // Corregido de valorRescateError a valorRescate
    const vidaUtil = document.getElementById('vidaUtil').value.trim();

    let isValid = true;

    // Validación de valorLibros
    if (valorLibros === '') {
        document.getElementById('valorLibrosError').innerText = 'No puede estar vacío.';
        isValid = false;
    } else if (isNaN(valorLibros)) {  // Corregido de vidaUtil a valorLibros
        document.getElementById('valorLibrosError').innerText = 'Debe ser numérico.';
        isValid = false;
    }

    // Validación de valorRescate
    if (valorRescate === '') {  // Corregido de valorRescateError a valorRescate
        document.getElementById('valorRescateError').innerText = 'No puede estar vacío.';
        isValid = false;
    } else if (isNaN(valorRescate)) {  // Corregido de vidaUtil a valorRescate
        document.getElementById('valorRescateError').innerText = 'Debe ser numérico.';
        isValid = false;
    }

    // Validación de vidaUtil
    if (vidaUtil === '') {
        document.getElementById('vidaUtilError').innerText = 'No puede estar vacío.';
        isValid = false;
    } else if (isNaN(vidaUtil)) {
        document.getElementById('vidaUtilError').innerText = 'Debe ser numérico.';
        isValid = false;
    }

    // Mostrar datos si todo es válido
    if (isValid) {
        //    alert(`Vida util: ${vidaUtil}\nValor rescate: ${valorRescate}\nValor libros: ${valorLibros}`)

        let opcion = button.innerText || button.textContent;
        //   alert(opcion)


        if (button.id === "lineaRecta") {
            obtenerLineaRecta(thead, tbody, parseFloat(valorLibros), parseFloat(valorRescate), parseFloat(vidaUtil));
            titulo.innerHTML = opcion;
        } else {
            obtenerSumaDigito(thead, tbody, parseFloat(valorLibros), parseFloat(valorRescate), parseFloat(vidaUtil));
            titulo.innerHTML = opcion;
        }

    }
}



function mostrarTablaSumaDigitos(thead) {
    let tiempo = selectElement.value == '1' ? 'anual' : 'mensual';
    thead.innerHTML =
        `
          <th>Año</th>
          <th>Fracción</th>
          <th>Depreciación total</th>
          <th>Depreciación ${tiempo}</th>
          <th>Depreciación acumulada</th>
          <th>Valor en libros</th>
        `;
}


function depreciacionSumaDigitos(vidaUtil) {
    return (vidaUtil * (vidaUtil + 1)) / 2;
}


function obtenerSumaDigito(thead, tbody, valorLibros, valorRescate, vidaUtil) {
    mostrarTablaSumaDigitos(thead);
    let depreciacionAcumulada = 0;
    let depreciacionAnual = depreciacionSumaDigitos(vidaUtil);
    const depreciacionTotal = valorLibros - valorRescate;
    let nuevoValorLibros = 0;
    let nuevaDepreciacionAnual = 0;
    let fraccion = 0;
    tbody.innerHTML = '';
    for (let i = 0; i <= vidaUtil; i++) {
        if (i == 0) {
            tbody.innerHTML +=
                `
        <td style="font-weight: bold;">0</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>${valorLibros}</td>
        `;
        } else {
            fraccion = ((vidaUtil + 1) - i) / depreciacionAnual;
            nuevaDepreciacionAnual = (parseFloat(fraccion) * parseFloat(depreciacionTotal));
            depreciacionAcumulada = depreciacionAcumulada + nuevaDepreciacionAnual;
            nuevoValorLibros = valorLibros - depreciacionAcumulada;

            tbody.innerHTML +=
                `
        <td style="font-weight: bold;">${i}</td>
        <td>${parseFloat(fraccion.toFixed(3))}</td>
        <td>${depreciacionTotal}</td>
        <td>${selectElement.value == '1' ? parseFloat(nuevaDepreciacionAnual.toFixed(3)) : parseFloat((nuevaDepreciacionAnual / 12).toFixed(3))}</td>
        <td>${parseFloat(depreciacionAcumulada.toFixed(3))}</td>
        <td>${parseFloat(nuevoValorLibros.toFixed(3))}</td>
        `;


        }
    }
}

