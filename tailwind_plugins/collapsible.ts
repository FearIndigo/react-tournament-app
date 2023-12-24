import plugin from 'tailwindcss/plugin'

export default plugin(function ({ addComponents }) {
  addComponents({
    '.collapsible-wrapper': {
      display: 'flex',
      overflow: 'hidden',
    },
    '.collapsible-wrapper:after': {
      content: '',
      height: '10px',
      transition: 'height 0.3s linear, max-height 0s 0.3s linear',
      maxHeight: '0px',
    },
    '.collapsible': {
      transition: 'margin-bottom 0.3s cubic-bezier(0, 0, 0, 1)',
      marginBottom: '0',
      maxHeight: '1000000px',
    },
    '.collapsible-wrapper.collapsed > .collapsible': {
      marginBottom: '-2000px',
      transition:
        'margin-bottom 0.3s cubic-bezier(1, 0, 1, 1), visibility 0s 0.3s, max-height 0s 0.3s',
      visibility: 'hidden',
      maxHeight: '0',
    },
    '.collapsible-wrapper.collapsed:after': {
      height: '0',
      transition: 'height 0.3s linear',
      maxHeight: '10px',
    },
  })
})
