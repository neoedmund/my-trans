const scope = [ 'en' , 'ja' , 'zh' ] ;

export default {
	async fetch ( request , env ) {
		const params = new URLSearchParams ( new URL ( request . url ) . search )
		var lang = params . get ( 'lang' )
		if ( lang == 'cn' ) lang = 'zh' ;
		if ( lang == 'jp' ) lang = 'ja' ;
		const text = params . get ( 'text' )
		if ( isEmpty ( lang ) || isEmpty ( text ) || ( ! scope . includes ( lang ) ) ) {
			return Response . json ( { 'param' : "lang['en','ja','zh'],text" } )
		}
		console . log ( 'lang' , lang , 'text' , text )
		var req = [ ]
		for ( let lang0 of scope ) {
			if ( lang0 == lang ) continue ;
			var inputs = {
				text : text ,
				source_lang : lang ,
				target_lang : lang0 ,
			}
			req . push ( lang0 )
			req . push ( env . AI . run ( '@cf/meta/m2m100-1.2b' , inputs ) )
		}
		var ret = { }
		ret [ req [ 0 ] ] = await req [ 1 ] ;
		ret [ req [ 2 ] ] = await req [ 3 ] ;
		return Response . json ( ret ) ;
	} ,
}
function isEmpty ( s ) {
	if ( s ) return false
	else return true ;
}
