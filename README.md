# 📦 Proyecto Angular 8 - Gestión de Colaboradores

Este es un sistema web desarrollado en **Angular 8** que permite la gestión de colaboradores en una empresa. Se conecta con un backend vía **Socket.io** para actualizaciones en tiempo real y soporta carga de imágenes en **/storage/colaboradores/{nombre}**.

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 12.x recomendada) - [Descargar aquí](https://nodejs.org/)
- **Angular CLI 8** - Instalar con:

  ```bash
  npm install -g @angular/cli@8
  ```

- **Backend con Socket.io** (debe estar corriendo en `http://localhost:3000`)

## 👅 Instalación

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar dependencias**  
   ```bash
   npm install
   ```

3. **Agregar Bootstrap (si no está instalado)**  
   ```bash
   npm install bootstrap
   ```

   Luego, agrégalo en `angular.json`:

   ```json
   "styles": [
     "node_modules/bootstrap/dist/css/bootstrap.min.css",
     "src/styles.css"
   ]
   ```

## ▶️ Cómo Ejecutar el Proyecto

Ejecuta el servidor de desarrollo con:

```bash
ng serve
```

Luego abre `http://localhost:4200/` en tu navegador.

---

## ⚡ Funcionalidades Principales

- 📌 **Autenticación:** Permite login y registro de colaboradores.
- 📝 **Gestión de Colaboradores:** Agregar, editar y eliminar registros.
- 📡 **Actualización en Tiempo Real:** Integrado con **Socket.io**.
- 🖼️ **Carga de Imágenes:** Almacena fotos en `/storage/colaboradores/{nombre}`.
- 🎨 **Interfaz Responsiva:** Estilizada con **Bootstrap**.

---

## 🔧 Configuración de Socket.io

El proyecto se comunica con un servidor en **`http://localhost:3000`**. Para asegurar la conexión:

1. **Verifica que el backend esté en ejecución.**
2. **Edita `server.service.ts` si necesitas cambiar la URL del servidor.**

```typescript
this.socket = io("http://localhost:3000", { autoConnect: false });
```

---

## 🐂 Estructura del Proyecto

```
/src
  ├── app
  │   ├── components
  │   │   ├── menu
  │   │   ├── login-widget
  │   │   ├── register-widget
  │   │   ├── edit-widget
  │   │   ├── card
  │   │   ├── index
  │   ├── services
  │   │   ├── server.service.ts   # Conexión con Socket.io
  │   │   ├── global.service.ts   # Manejo de filtros globales
  │   ├── app.component.ts
  │   ├── app.routes.ts
  ├── assets
  ├── environments
  ├── styles.css
```

---

## ❓ Problemas Comunes y Soluciones

🔹 **Error `NG8001: 'app-menu' is not a known element`**
- Asegúrate de que los componentes están importados en `app.component.ts`:

  ```typescript
  imports: [MenuComponent, IndexComponent]
  ```

🔹 **Error `Schema validation failed: Data path "" should have required property 'version'`**
- Edita `angular.json` y asegúrate de que contenga:

  ```json
  {
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "version": 1
  }
  ```

---

## 👨‍💻 Autor

📌 **Juan** - _Desarrollador Fullstack_  
📚 [LinkedIn](https://www.linkedin.com/) | 🌐 [Portfolio](https://tu-website.com/)

---

## 🐝 Licencia

Este proyecto está bajo la **MIT License** – puedes usarlo libremente para fines personales y comerciales. 🚀
