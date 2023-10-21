import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[megaMenu]',
  standalone: true,
  template: ` <summary>Parent</summary>
    <ul
      class="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow xl:menu-horizontal lg:min-w-max"
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
