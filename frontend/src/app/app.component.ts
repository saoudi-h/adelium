import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: ` <main class="flex items-center justify-center w-screen h-screen">
      <div
        class="text-2xl  text-blue-900 bg-blue-200 border-blue-800 border shadow-md rounded-xl p-4 m-6">
        test tailwindcss
      </div>
    </main>

    <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'adelium'
}
