export const getTriggerTemplate = (triggerName: string, query: string): string =>
 `CALL apoc.trigger.add('${triggerName}', ` +
  `'CALL apoc.periodic.submit("${triggerName}", \\'` + "\n" +
  `    ` + query + "\n" +
  `\\')', {phase: 'after'});\n`
