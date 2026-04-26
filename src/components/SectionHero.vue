<script setup>
defineProps({
  kicker: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section class="section-hero">
    <p v-if="kicker" class="section-hero__kicker">{{ kicker }}</p>
    <h1 class="section-hero__title">{{ title }}</h1>
    <h2 v-if="subtitle" class="section-hero__subtitle">{{ subtitle }}</h2>
    <p v-if="description" class="section-hero__description">{{ description }}</p>
    <div class="section-hero__slot">
      <slot />
    </div>
  </section>
</template>
