<?php
/**
 * Adds a simple WordPress pointer to Appearance menu
 */
 
function velocity_enqueue_pointer_script_style( $hook_suffix ) {
	
	// Assume pointer shouldn't be shown
	$enqueue_pointer_script_style = false;

	// Get array list of dismissed pointers for current user and convert it to array
	$dismissed_pointers = explode( ',', get_user_meta( get_current_user_id(), 'dismissed_wp_pointers', true ) );

	// Check if our pointer is not among dismissed ones
	if( !in_array( 'velocity_setting_pointer', $dismissed_pointers ) ) {
		$enqueue_pointer_script_style = true;
		
		// Add footer scripts using callback function
		add_action( 'admin_print_footer_scripts', 'velocity_pointer_print_scripts' );
	}

	// Enqueue pointer CSS and JS files, if needed
	if( $enqueue_pointer_script_style ) {
		wp_enqueue_style( 'wp-pointer' );
		wp_enqueue_script( 'wp-pointer' );
	}
	
}
add_action( 'admin_enqueue_scripts', 'velocity_enqueue_pointer_script_style' );

function velocity_pointer_print_scripts() {
	$pointer_content  = "<h3>Thank you for using Velocity!</h3>";
	$pointer_content .= "<p>Please use the menu items in ".__("Appearance","velocity")." to customise the theme to your needs!</p><p>You can find our Online-Documentation <a target=_blank href=http://goodwebtheme.com/velodoc >here</a></p>";
	?>
	
	<script type="text/javascript">
	//<![CDATA[
	jQuery(document).ready( function($) {
		jQuery('#toplevel_page_velocity_theme_menu').pointer({
			content:		'<?php echo $pointer_content; ?>',
			position:		{
								edge:	'left', // arrow direction
								align:	'center' // vertical alignment
							},
			pointerWidth:	350,
			close:			function() {
								$.post( ajaxurl, {
										pointer: 'velocity_setting_pointer', // pointer ID
										action: 'dismiss-wp-pointer'
								});
							}
		}).pointer('open');
	});
	//]]>
	</script>
<?php
}
?>