import { defineConfig } from 'vite';
import lwc from 'vite-plugin-lwc';
import path from 'path';

export default defineConfig({
  plugins: [
    lwc({
      modules: [
        {
          dir: path.resolve('./src/modules')
        },
        {
          name: '@salesforce/gate/bc.260.enableComboboxElementInternals',
          path: path.resolve('./src/shim/gateComboboxElementInternalsClosed.js')
        },
        {
          npm: 'lightning-base-components'
        }
      ],
      // Enable synthetic shadow (like Salesforce platform)
      // false = use synthetic shadow, true = use native shadow
      disableSyntheticShadowSupport: false,
      exclude: [path.resolve('./index.html'), path.resolve('./src/generated')]
    })
  ],
  appType: 'spa',
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@salesforce-ux/design-system': path.resolve('./node_modules/@salesforce-ux/design-system'),
      // Redirect icon template dynamic imports to pre-compiled bundles.
      // These aliases run at enforce:'pre', before the LWC plugin resolves them
      // to the npm package (which would trigger 1,614 individual HTML file requests).
      'lightning/iconSvgTemplatesUtility': path.resolve('./src/modules/lightning/iconSvgTemplatesUtility/iconSvgTemplatesUtility.js'),
      'lightning/iconSvgTemplatesStandard': path.resolve('./src/modules/lightning/iconSvgTemplatesStandard/iconSvgTemplatesStandard.js'),
      'lightning/iconSvgTemplatesDoctype': path.resolve('./src/modules/lightning/iconSvgTemplatesDoctype/iconSvgTemplatesDoctype.js'),
      'lightning/iconSvgTemplatesAction': path.resolve('./src/modules/lightning/iconSvgTemplatesAction/iconSvgTemplatesAction.js'),
    }
  }
});
