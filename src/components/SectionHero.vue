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
  <section class="section-hero max-w-[1600px] mx-auto w-full px-6 lg:px-12 pt-8 pb-14 md:pt-10 md:pb-16">
    <p v-if="kicker" class="section-hero__kicker text-bamboo-base text-[12px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
      <span class="w-8 h-[1px] bg-bamboo-soft"></span>
      {{ kicker }}
    </p>
    <h1 class="section-hero__title text-5xl md:text-7xl font-medium tracking-tight text-ink-base">{{ title }}</h1>
    <h2 v-if="subtitle" class="section-hero__subtitle mt-4 text-xl md:text-2xl text-bamboo-dark font-medium">{{ subtitle }}</h2>
    <p v-if="description" class="section-hero__description mt-4 max-w-3xl text-bamboo-dark text-sm leading-relaxed">{{ description }}</p>
    <div class="section-hero__slot mt-8">
      <slot />
    </div>
  </section>
</template>
