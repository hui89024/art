<script>
export default {
  name: 'CTACluster',
  props: {
    primaryText: {
      type: String,
      default: ''
    },
    secondaryText: {
      type: String,
      default: ''
    }
  },
  emits: ['primary', 'secondary'],
  methods: {
    handlePrimary() {
      this.$emit('primary')
    },
    handleSecondary() {
      this.$emit('secondary')
    }
  }
}
</script>

<template>
  <div class="cta-cluster">
    <button type="button" class="cta-cluster__primary" @click="handlePrimary">
      {{ primaryText }}
    </button>
    <button type="button" class="cta-cluster__secondary" @click="handleSecondary">
      {{ secondaryText }}
    </button>
  </div>
</template>
