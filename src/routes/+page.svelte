<script lang="ts">
  // Estado para los diferentes inputs
  let textValue = '';
  let numberValue = 0;
  let emailValue = '';
  let passwordValue = '';
  let textareaValue = '';
  let checkboxValue = false;
  let switchValue = false;
  let radioValue = 'option1';
  let selectValue = 'option1';
  let sliderValue = 50;
  let rangeValue = [25, 75];
  let dateValue = new Date();
  let tagsValue = ['Turso', 'Drizzle', 'SvelteKit'];
  let fileValue: any[] = [];
  let progressValue = 65;
  
  // Opciones para select
  const selectOptions = [
    { value: 'option1', name: 'Opción 1' },
    { value: 'option2', name: 'Opción 2' },
    { value: 'option3', name: 'Opción 3' }
  ];
  
  // Función para manejar el envío del formulario
  function handleSubmit() {
    // Aquí implementarías la lógica para enviar los datos a tu API
    // usando Drizzle para interactuar con la base de datos Turso
    console.log({
      textValue,
      numberValue,
      emailValue,
      passwordValue,
      textareaValue,
      checkboxValue,
      switchValue,
      radioValue,
      selectValue,
      sliderValue,
      rangeValue,
      dateValue,
      tagsValue,
      fileValue
    });
  }
</script>

<div class="container mx-auto p-4 space-y-8">
  <h1 class="h1 mb-8">Formulario de Template para Freelance</h1>
  
  <form on:submit|preventDefault={handleSubmit} class="card preset-outlined-surface-200-800 p-6 space-y-6">
    <!-- Accordion: Información Básica -->
    <div class="accordion">
      <div class="accordion-item open">
        <button class="accordion-header">
          <span class="accordion-lead">📝</span>
          <span class="accordion-summary">Información Básica</span>
          <span class="accordion-caret"></span>
        </button>
        <div class="accordion-content">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Input de texto -->
            <label class="label">
              <span>Nombre</span>
              <input type="text" class="input" bind:value={textValue} placeholder="Escribe tu nombre" />
            </label>
            
            <!-- Input numérico -->
            <label class="label">
              <span>Edad</span>
              <input type="number" class="input" bind:value={numberValue} min="0" max="120" />
            </label>
            
            <!-- Input de email -->
            <label class="label">
              <span>Email</span>
              <input type="email" class="input" bind:value={emailValue} placeholder="tu@email.com" />
            </label>
            
            <!-- Input de contraseña -->
            <label class="label">
              <span>Contraseña</span>
              <input type="password" class="input" bind:value={passwordValue} placeholder="********" />
            </label>
          </div>
        </div>
      </div>
      
      <!-- Accordion: Detalles del Proyecto -->
      <div class="accordion-item">
        <button class="accordion-header">
          <span class="accordion-lead">🔍</span>
          <span class="accordion-summary">Detalles del Proyecto</span>
          <span class="accordion-caret"></span>
        </button>
        <div class="accordion-content">
          <!-- Textarea -->
          <label class="label">
            <span>Descripción</span>
            <textarea class="textarea" bind:value={textareaValue} placeholder="Describe tu proyecto..." rows="4"></textarea>
          </label>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <!-- Checkbox -->
            <label class="flex items-center space-x-2">
              <input class="checkbox" type="checkbox" bind:checked={checkboxValue} />
              <span>Incluir tests con Playwright</span>
            </label>
            
            <!-- Switch -->
            <label class="flex items-center space-x-2">
              <input class="switch" type="checkbox" bind:checked={switchValue} />
              <span>Documentar con Storybook</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Accordion: Tecnologías y Opciones -->
      <div class="accordion-item">
        <button class="accordion-header">
          <span class="accordion-lead">🔘</span>
          <span class="accordion-summary">Tecnologías y Opciones</span>
          <span class="accordion-caret"></span>
        </button>
        <div class="accordion-content">
          <!-- Radio Group -->
          <div class="mb-4">
            <span class="label">Base de datos:</span>
            <div class="radio-group">
              <label class="radio">
                <input type="radio" name="options" value="option1" bind:group={radioValue} />
                <span>Turso</span>
              </label>
              <label class="radio">
                <input type="radio" name="options" value="option2" bind:group={radioValue} />
                <span>Supabase</span>
              </label>
              <label class="radio">
                <input type="radio" name="options" value="option3" bind:group={radioValue} />
                <span>Otra</span>
              </label>
            </div>
          </div>
          
          <!-- Select -->
          <label class="label mb-4">
            <span>ORM preferido</span>
            <select class="select" bind:value={selectValue}>
              {#each selectOptions as option}
                <option value={option.value}>{option.name}</option>
              {/each}
            </select>
          </label>
          
          <!-- Combobox (implementado como select con datalist) -->
          <div class="mb-4">
            <span class="label">Framework UI adicional</span>
            <input class="input" list="frameworks" placeholder="Selecciona o escribe...">
            <datalist id="frameworks">
              <option value="Skeleton UI"></option>
              <option value="Tailwind UI"></option>
              <option value="Personalizado"></option>
            </datalist>
          </div>
        </div>
      </div>
      
      <!-- Accordion: Configuración de Rendimiento -->
      <div class="accordion-item">
        <button class="accordion-header">
          <span class="accordion-lead">📊</span>
          <span class="accordion-summary">Configuración de Rendimiento</span>
          <span class="accordion-caret"></span>
        </button>
        <div class="accordion-content">
          <!-- Slider -->
          <div class="mb-4">
            <span class="label">Prioridad del proyecto: {sliderValue}%</span>
            <input 
              type="range" 
              class="range" 
              bind:value={sliderValue} 
              min="0" 
              max="100" 
              step="1" 
            />
          </div>
          
          <!-- Progress -->
          <div class="mb-4">
            <span class="label">Progreso actual: {progressValue}%</span>
            <div class="progress">
              <div class="progress-bar" style="width: {progressValue}%"></div>
            </div>
          </div>
          
          <div class="flex justify-center mb-4">
            <div class="progress-ring w-24" style="--progress: {progressValue}"></div>
          </div>
        </div>
      </div>
      
      <!-- Accordion: Archivos y Etiquetas -->
      <div class="accordion-item">
        <button class="accordion-header">
          <span class="accordion-lead">📁</span>
          <span class="accordion-summary">Archivos y Etiquetas</span>
          <span class="accordion-caret"></span>
        </button>
        <div class="accordion-content">
          <!-- Date Picker (implementado como input date) -->
          <div class="mb-4">
            <span class="label">Fecha de entrega</span>
            <input type="date" class="input" bind:value={dateValue} />
          </div>
          
          <!-- Tags Input (implementado como input con chips) -->
          <div class="mb-4">
            <span class="label">Tecnologías</span>
            <div class="input-chip-group">
              {#each tagsValue as tag}
                <span class="chip preset-tonal">{tag}</span>
              {/each}
              <input class="input-chip" placeholder="Añade tecnologías..." />
            </div>
          </div>
          
          <!-- File Upload -->
          <div class="mb-4">
            <span class="label">Documentos de referencia</span>
            <input type="file" class="input" accept=".jpg,.png,.pdf,.doc,.docx" multiple />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Tabs -->
    <div class="tab-group">
      <div class="tab-list">
        <button class="tab tab-active">Detalles</button>
        <button class="tab">Configuración</button>
        <button class="tab">Despliegue</button>
      </div>
      <div class="tab-panel">
        <div class="card preset-tonal p-4 flex items-center gap-4">
          <div class="avatar w-12 aspect-square flex justify-center items-center rounded-full bg-surface-300-600-token">FS</div>
          <div>
            <p class="font-bold">Proyecto Freelance</p>
            <p class="text-sm opacity-70">Template con Turso, Drizzle y SvelteKit</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-end gap-4">
      <button type="button" class="btn preset-tonal">Cancelar</button>
      <button type="submit" class="btn preset-filled-primary-500">Guardar Proyecto</button>
    </div>
  </form>
</div>
