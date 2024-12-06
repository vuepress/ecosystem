import pkg from '../../package.json' with { type: 'json' }

const { peerDependencies, version } = pkg

export { peerDependencies, version }
