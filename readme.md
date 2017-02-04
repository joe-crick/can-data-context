# Can Data Context

This component creates a data context you can utilize to run a series of filters over a data source, while still
providing a semantic stache view for the data. The component is view agnostic. It merely provides a wrapper around
the view that enables the manipulation of the data used by the view. This makes it easy to add functionality to 
the view like:

 * pagination
 * searching
 * whatever your little heart desires
 
But, mostly, this is me just playing around with Folktale as I learn FP, and mucking about with an idea I had 
for working with tables that have all their data (as opposed to those who query a datasource for their data to 
manipulate it---e.g., i.e, dumb tables that call the server to sort or paginate data, &c). I might update this 
_the proverbial someday_ to deal with dumb tables. Who knows..?

## Getting Started

This isn't released to npm, so if you really want to use it, you'll have to fork it for now. Again, _someday_
I might get around to making it an npm package.


End with an example of getting some data out of the system or using it for a little demo

## Built With

* [Folktale](http://folktalejs.org/) - Generic Programming in JS
* [CanJs](https://canjs.com/) - Client-side architectural libraries
* [StealJs](https://stealjs.com/) - Module loader

## Authors

* **Joe Crick** - *Initial work* - [PurpleBooth](https://github.com/joe-crick)

## License

This project is licensed under the MIT License - have at it!

## Acknowledgments

* Thanks to [Alexis Abril](https://github.com/alexisabril) for pointing me in the right direction with leak scope
* Thanks to [Marshall Thompson](https://github.com/marshallswain) for thinking this was awesome.

