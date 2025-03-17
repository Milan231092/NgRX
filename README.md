Here's a simple `README.md` focusing only on running the application for your client demo:  

```markdown
# Angular 19 Firebase Message Application

## Prerequisites
- Node.js (LTS version recommended)
- Angular CLI (`npm install -g @angular/cli`)

## Setup & Run

1. **Clone the repository**  
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Set up Firebase**  
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)  
   - Add a new web app and get Firebase config  
   - Replace the Firebase config in `src/environments/environment.ts`

4. **Run the application**  
   ```sh
   ng serve
   ```
   - Open `http://localhost:4200/` in your browser

## Deployment (Optional)
To deploy the app using Firebase Hosting:
```sh
ng build
firebase deploy
```
Make sure Firebase CLI is installed: `npm install -g firebase-tools`

---

Let me know if you need any modifications! 🚀
```
