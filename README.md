# Simulador de Plazos Fijos

### Objetivo:
- El simulador de Plazos Fijos busca brindar al usuario una herramienta con la que pueda calcular de forma sencilla cuál sería su ganancia si decidiera operar en función del dinero que ingresa, en función de la cantidad de días que dicha suma permanece en el plazo fijo y en función del banco que elija para hacer la gestión.
- El Plazo Fijo Grupal tiene el objetivo de que varias personas, si asi lo desean, puedan invertir sus ahorros de forma conjunta. Esto facilitaría el ingreso al Plazo Fijo, puesto que el mínimo para comenzar a operar es de $15000.

#### Individual:
- El simulador requiere que el usuario ingrese dos tipos de datos, ambos numéricos. Le solicita un monto a depositar y una cantidad de días para determinar la duración del plazo fijo.
- El depósito mínimo es de $15000.
- El usuario debe seleccionar el banco para realizar la gestión y luego presionar el botón "Calcular"
- El usuario puede elegir luego borrar los resultados con "Borrar Resultados" o recuperar los datos ingresados en la ultima consulta a traves del botón "Repetir Anterior".


#### Grupal:
- El simulador tiene varios puntos a completar, el nombre del Participante, el monto que esa persona va a ingresar, el tiempo por el cual va a funcionar el Plazo Fijo Grupal y finalmente el banco en el que se desea realizar la gestión.
- Por cada persona que va a participar del Plazo Fijo se debe cargar un Participante y un Monto, y luego presionar "Agregar Participante" para continuar la carga de las demás personas. Se va generando una lista que permite seguir las personas que van siendo agregadas al Plazo Fijo.
- El depósito mínimo es de $15000.
- Se debe seleccionar el tiempo para mantener la duración del plazo fijo con el slider y también seleccionar el banco.
- Por ultimo se presiona "Finalizar Calculo" para saber la ganancia individual de cada uno de los participantes una vez concluido el Plazo Fijo. A su vez se pueden borrar los resultados con "Borrar Resultados" para volver a realizar otra operación.


### Histórico de Mejoras:

#### Previo a la 1º Entrega:
- Se mejora aspecto visual del HTML. 
- Se crean dos botones para acceder a nueva funcionalidad que permite acceder al simulador de Plazos Fijos con participación Grupal.
- Se crea una nueva clase que va a ser utilizada en ambas modalidades de Plazos Fijos con el objetivo de reciclar código.
- Se agrega un botón asociado a una nueva función que permite borrar los resultados que surgen en forma de lista de la versión grupal del simulador.

#### Updates para 2º Entrega:
- Se eliminan los alerts y los prompts.
- Se agregan formularios para entrada de valores.
- Ahora los errores por tiempo inválido se muestran manipulando el DOM.
- Se hace uso de LocalStorage para poder repetir consultas anteriores.
- Se crea función para vincular botones con funcionalidades y reciclar código.
- Se crea función para que elemento del DOM se elimine a si mismo cuando se realiza evento, en este caso para un botón.

#### Updates para 3º Entrega:
- Se corrige botón "Borrar Resultados" en Plazo Fijo Grupal.
- Se modifica en HTML la ubicación espacial de los alerts de Boostrap.
- Se modifica la función "invalid" para que pueda ser reutilizada.
- Se agregan efectos de jQuery a elementos que son creados y/o eliminados modificando el DOM.
- Se agrega una sección para ver cotizaciones de moneda extranjera, en este caso del dolar, a través de la consulta a un JSON estático, utilizando ajax.
- Se modifica el color de aquellos alerts que representen errores, ahora son rojos.
- Se modifica nombre de variables en documentos HTML y Js para que mantengan la misma estructura.

#### Más Fixes y Updates para 3º Entrega:
- Se agregan validaciones para que solo puedan ingresarse montos positivos en todos los inputs.
- Se agregan más efectos de jQuery.
- Se agrega un navbar y un footer con botón para volver hacia arriba.
- Se mejora función "invalid" que ahora es "invalidMessage" para que sea dinámico y cambie los mensajes de error segun corresponda.
- Se agrega un JSON estático que contiene distintos porcentajes de diferentes bancos, que serán usados de forma dinamica para definir el rate que va a ser usado para el calculo de los plazos fijos. Eso se selecciona a través de un botón de radio, agregado en el HTML.
- Se agrega un slide de range para seleccionar el tiempo solo en el Plazo Fijo Grupal y se adapta al projecto con un evento de Js.
- Se agrega un monto mínimo de depósito de $15000 tanto para ambas modalidades de Plazo Fijo, solo a los fines de darle sentido de ser al Plazo Fijo Grupal.