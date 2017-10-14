#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var Kafka = require('node-rdkafka');

program
  .version('0.1.0')
  .option('-p, --port', 'Port')
  .parse(process.argv);

if (program.port) {
    var producer = new Kafka.Producer({
        'metadata.broker.list': '10.2.43.213:9092'
    });

    console.log('Taste test cheese');
    producer.connect();
    producer.on('ready', function() {
       console.log("Producer is ready")
       try {
        console.log("Producing Message!")
        producer.produce('test2', null, new Buffer('Awesome message'), 'Stormwind', Date.now());
      } catch (err) {
        console.error('A problem occurred when sending our message');
        console.error(err);
      }
    });

    // Any errors we encounter, including connection errors
    producer.on('event.error', function(err) {
        console.error('Error from producer');
        console.error(err);
    })

    producer.on('delivery-report', function(err) {
        console.error('Report from producer');
        console.error(err);
    })
}