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
  <div class="cta-cluster flex flex-wrap items-center gap-4 mt-6">
    <button
      type="button"
      class="cta-cluster__primary px-8 py-3 bg-bamboo-base text-paper-base font-medium rounded-lg hover:bg-bamboo-dark transition-colors duration-200"
      @click="handlePrimary"
    >
      {{ primaryText }}
    </button>
    <button
      type="button"
      class="cta-cluster__secondary px-8 py-3 border-2 border-bamboo-base text-bamboo-base font-medium rounded-lg hover:bg-bamboo-soft hover:border-bamboo-dark transition-colors duration-200"
      @click="handleSecondary"
    >
      {{ secondaryText }}
    </button>
  </div>
</template>
