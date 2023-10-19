import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[megaMenu]',
  standalone: true,
  template: ` <summary>Parent</summary>
    <ul
      class="xl:menu-horizontal lg:min-w-max rounded-box mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 w-52"
      tabindex="0">
      <li>
        <a>Solutions</a>
        <ul>
          <li><a>Design</a></li>
          <li><a>Development</a></li>
          <li><a>Hosting</a></li>
          <li><a>Domain register</a></li>
        </ul>
      </li>
      <li>
        <a>Enterprise</a>
        <ul>
          <li><a>CRM software</a></li>
          <li><a>Marketing management</a></li>
          <li><a>Security</a></li>
          <li><a>Consulting</a></li>
        </ul>
      </li>
      <li>
        <a>Products</a>
        <ul>
          <li><a>UI Kit</a></li>
          <li><a>Wordpress themes</a></li>
          <li><a>Wordpress plugins</a></li>
          <li>
            <a>Open source</a>
            <ul>
              <li><a>Auth management system</a></li>
              <li><a>VScode theme</a></li>
              <li><a>Color picker app</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a>Company</a>
        <ul>
          <li><a>About us</a></li>
          <li><a>Contact us</a></li>
          <li><a>Privacy policy</a></li>
          <li><a>Press kit</a></li>
        </ul>
      </li>
    </ul>`,
  imports: [CommonModule],
})
export class MegaMenuComponent {}
